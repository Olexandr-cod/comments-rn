import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import ButtonDefault from '../../../../components/UI/ButtonDefault';
import { colors, positionHelpers } from '../../../../styles';
import { cs } from '../../styles';

interface CommentFormProps {
    imageUri: string | null
    userName: string
    email: string
    text: string
    captcha: string
    captchaInput: string
    selectImage: () => void
    setUserName: (val: string) => void
    setEmail: (val: string) => void
    setText: (val: string) => void
    setCaptchaInput: (val: string) => void
    themeCheck: boolean
    errors: any
    addComment: () => void
}

const CommentForm = ({
    imageUri,
    userName,
    email,
    text,
    captcha,
    selectImage,
    setUserName,
    setEmail,
    setText,
    captchaInput,
    setCaptchaInput,
    themeCheck,
    errors,
    addComment,
}: CommentFormProps) => {
    return (
        <View style={cs.containerForms}>
            <View style={positionHelpers.alignItemsCenterRow}>
                <ButtonDefault
                    title="Select Image"
                    buttoStyles={cs.imgButton}
                    onPress={selectImage}
                />
                {imageUri &&
                    <Image source={{ uri: `data:image/jpeg;base64,${imageUri}` }} style={cs.imgSelected} />
                }
            </View>
            <TextInput
                placeholder="Name"
                placeholderTextColor={themeCheck ? colors.silver2 : colors.silver}
                value={userName}
                onChangeText={setUserName}
                style={themeCheck ? cs.inputDark : cs.input}
            />
            {errors.userName && <Text style={cs.errorText}>{errors.userName}</Text>}
            <TextInput
                placeholder="Email"
                placeholderTextColor={themeCheck ? colors.silver2 : colors.silver}
                value={email}
                onChangeText={setEmail}
                style={themeCheck ? cs.inputDark : cs.input}
                keyboardType="email-address"
            />
            {errors.email && <Text style={cs.errorText}>{errors.email}</Text>}
            <TextInput
                placeholder="Comment"
                placeholderTextColor={themeCheck ? colors.silver2 : colors.silver}
                value={text}
                onChangeText={setText}
                style={themeCheck ? cs.inputDark : cs.input}
                multiline
            />
            {errors.text && <Text style={cs.errorText}>{errors.text}</Text>}
            <Text style={[cs.captchaText, themeCheck ? { color: colors.white } : { color: colors.black }]}>{captcha}</Text>
            <TextInput
                placeholder="Enter CAPTCHA"
                placeholderTextColor={themeCheck ? colors.silver2 : colors.silver}
                value={captchaInput}
                onChangeText={setCaptchaInput}
                style={themeCheck ? cs.inputDark : cs.input}
            />
            {errors.captcha && <Text style={cs.errorText}>{errors.captcha}</Text>}
            <ButtonDefault
                buttoStyles={cs.addComentButton}
                textStyles={{ color: themeCheck ? colors.white : colors.black }}
                title="Add Comment"
                onPress={addComment}
            />
        </View >
    );
};

export default CommentForm;


