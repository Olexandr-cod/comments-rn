import React, { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    Button,
    Text,
} from 'react-native';
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import io, { Socket } from 'socket.io-client';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';
import NetInfo from '@react-native-community/netinfo';
import { cs } from './styles';
import CommentForm from './components/CommentForm';
import Config from 'react-native-config';
import PaginationInfo from './components/PaginationInfo';
import { generateCaptcha } from '../../utils/generateCaptcha';
import { isIOS } from '../../utils/platformCheck';
import { clearDatabase, openDatabase } from './database';
import { CommentType } from './types';
import CommentItem from './components/CommentItem';
import { positionHelpers } from '../../styles';
import Accordion from '../../components/Accordion';
import { isValidEmail } from '../../utils/validEmail';

const OPENWEATHER_API_KEY = Config.API_OPENWEATHER_KEY;
SQLite.enablePromise(true);

const HomeScreen = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [comments, setComments] = useState<CommentType[]>([]);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [captcha, setCaptcha] = useState<string>('');
    const [captchaInput, setCaptchaInput] = useState<string>('');
    const [parentId, setParentId] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ avatar?: string | null; userName?: string; email?: string; text?: string; captcha?: string }>({});
    const [socket, setSocket] = useState<Socket>();
    const [isConnected, setIsConnected] = useState<boolean | null>(false);
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 25;

    // Підключення до сокет-серверу
    useEffect(() => {
        const socketInstance = io('ws://localhost:3000', { transports: ['websocket'] });
        setSocket(socketInstance);

        socketInstance.on('newComment', (comment) => {
            setComments((prevComments) => [...prevComments, comment]);
        });

        generateNewCaptcha();
        requestLocationPermission();

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    // Завантажуємо коментарі з бази
    useEffect(() => {
        const loadComments = async () => {
            const db: SQLiteDatabase | any = await openDatabase();
            const result: ResultSet[] = await db.executeSql('SELECT * FROM comments');
            const rows: CommentType[] = result[0].rows.raw();

            // Створюємо структуру коментарів
            const commentMap = new Map();
            rows.forEach((comment) => {
                commentMap.set(comment.id, { ...comment, replies: [] });
            });

            const rootComments: CommentType[] = [];

            rows.forEach((comment) => {
                if (comment.parentId === null) {
                    // Якщо коментар не має parentId, додаємо його до кореня
                    rootComments.push(commentMap.get(comment.id));
                } else {
                    // Якщо коментар має parentId, додаємо його до відповідного батька
                    const parent = commentMap.get(comment.parentId);
                    parent.replies.push(commentMap.get(comment.id));
                }
            });

            setComments(rootComments);
        };

        loadComments();
    }, []);

    const saveCommentLocally = async (comment: CommentType) => {
        try {
            const db = await openDatabase();
            await db.executeSql('INSERT INTO comments (email, userName, text, avatar, parentId, isSynced) VALUES (?, ?, ?, ?, ?, ?);',
                [comment.email, comment.userName, comment.text, comment.avatar, comment.parentId, 0]);
        } catch (error) {
            console.log('Error saving comment locally:', error);
        }
    };

    // Відправка коментарів після відновлення з'єднання
    const sendUnsyncedComments = async () => {
        try {
            const db: SQLiteDatabase | any = await openDatabase();
            const result = await db.executeSql('SELECT * FROM comments WHERE isSynced = 0');
            const unsyncedComments = result[0].rows.raw();

            unsyncedComments.forEach((comment: CommentType) => {
                if (socket) {
                    socket.emit('addComment', { text: comment.text, parentId: comment.parentId });
                    // Оновлюємо статус коментаря на "synced"
                    db.executeSql('UPDATE comments SET isSynced = 1 WHERE id = ?;', [comment.id]);
                }
            });
        } catch (error) {
            console.log('Error sending unsynced comments:', error);
        }
    };

    useEffect(() => {
        // Перевірка наявності підключення до мережі
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);

            if (state.isConnected) {
                sendUnsyncedComments();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const generateNewCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const requestLocationPermission = async () => {
        const result = await request(
            isIOS() ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (result === RESULTS.GRANTED) {
            getLocation();
        } else {
            console.log('Location permission denied');
        }
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getSunTimes(latitude, longitude);
            },
            error => {
                console.log('Geolocation error:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getSunTimes = async (lat: number, lon: number) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
            const data = await response.json();
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            const now = new Date();
            setTheme(now >= sunrise && now < sunset ? 'light' : 'dark');
        } catch (error) {
            console.log('Error fetching sun times:', error);
        }
    };

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) { return; }
            if (response.assets) {
                const imageUriProps = response.assets[0].uri;
                resizeImage(imageUriProps);
            }
        });
    };

    const resizeImage = async (uri: string | any) => {
        try {
            const resizedUri = await ImageEditor.cropImage(uri, {
                offset: { x: 0, y: 0 },
                size: { width: 320, height: 240 },
            });
            const base64Image = await RNFS.readFile(resizedUri.path, 'base64');
            setAvatar(base64Image);
        } catch (error) {
            console.log('Image resizing error:', error);
        }
    };

    const validateInputs = () => {
        let newErrors: { avatar?: string | null; userName?: string; email?: string; text?: string; captcha?: string } = {};

        if (userName.trim().length < 2) {
            newErrors.userName = 'Name must be at least 2 characters';
        }
        if (!isValidEmail(email.trim())) {
            newErrors.email = 'Invalid email format';
        }
        if (text.trim().length < 5) {
            newErrors.text = 'Comment must be at least 5 characters';
        }
        if (captchaInput.trim() !== captcha) {
            newErrors.captcha = 'CAPTCHA mismatch';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addComment = async () => {
        const trimmedUserName = userName.trim();
        const trimmedEmail = email.trim();
        const trimmedText = text.trim();
        const trimmedCaptchaInput = captchaInput.trim();

        // Валідація
        if (trimmedUserName.length < 2) {
            console.log('Name must be at least 2 characters');
            return;
        }

        if (!isValidEmail(trimmedEmail)) {
            console.log('Invalid email format');
            return;
        }

        if (trimmedText.length < 5) {
            console.log('Comment must be at least 5 characters');
            return;
        }

        if (trimmedCaptchaInput !== captcha) {
            console.log('CAPTCHA mismatch');
            generateNewCaptcha();
            return;
        }

        const newComment: any = {
            id: 0,
            email: trimmedEmail,
            userName: trimmedUserName,
            text: trimmedText,
            avatar,
            parentId,
            isSynced: false,
        };

        try {
            if (isConnected) {
                if (socket) {
                    socket.emit('addComment', { text: trimmedText, parentId });
                }
                const db: SQLiteDatabase | any = await openDatabase();
                await db.executeSql(
                    'INSERT INTO comments (email, userName, text, avatar, parentId, isSynced) VALUES (?, ?, ?, ?, ?, ?);',
                    [trimmedEmail, trimmedUserName, trimmedText, avatar, parentId, 1]
                );
            } else {
                await saveCommentLocally(newComment);
            }

            setUserName('');
            setEmail('');
            setText('');
            setCaptchaInput('');
            setAvatar(null);
            setParentId(null);
            generateNewCaptcha();

            // Оновлення коментарів
            const db: SQLiteDatabase | any = await openDatabase();
            const result = await db.executeSql('SELECT * FROM comments');
            setComments(result[0].rows.raw());

        } catch (error) {
            console.log('Error adding comment:', error);
        }
    };

    const handleAddComment = () => {
        if (validateInputs()) {
            addComment();
        }
    };

    const renderComment = useCallback((comment: CommentType) => {
        return (
            <CommentItem
                key={comment?.id}
                parentId={comment.parentId}
                avatar={comment?.avatar}
                userName={comment?.userName}
                email={comment.email}
                text={comment.text}
                onReplay={() => setParentId(comment.id)}
            >
                {comment?.replies?.length > 0 && renderReplies(comment.replies)}
            </CommentItem>
        );
    }, []);

    const renderReplies = (replies: CommentType[]) => {
        return replies.map((reply) => renderComment(reply));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= Math.ceil(comments.length / itemsPerPage)) {
            setPage(newPage);
        }
    };

    const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const paginatedComments = sortedComments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <SafeAreaView style={[positionHelpers.fill, theme === 'dark' ? cs.darkTheme : cs.lightTheme]}>
            <Accordion titleHeader="Show Form">
                <CommentForm
                    imageUri={avatar}
                    userName={userName}
                    email={email}
                    text={text}
                    captcha={captcha}
                    captchaInput={captchaInput}
                    selectImage={selectImage}
                    setUserName={setUserName}
                    setEmail={setEmail}
                    setText={setText}
                    setCaptchaInput={setCaptchaInput}
                    themeCheck={theme === 'dark'}
                    errors={errors}
                    addComment={handleAddComment}
                />
            </Accordion>
            {/* <Button title="Clear" onPress={clearDatabase} /> */}
            <Text style={cs.tableTitle}>--- Comments ---</Text>
            <FlatList
                data={paginatedComments}
                renderItem={({ item }) => renderComment(item)}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={cs.mh15}
            />
            <PaginationInfo
                page={page}
                prevClick={() => handlePageChange(page - 1)}
                nextClick={() => handlePageChange(page + 1)}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
