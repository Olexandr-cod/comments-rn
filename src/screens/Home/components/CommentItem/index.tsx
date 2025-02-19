import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { positionHelpers } from '../../../../styles';
import CheckAvatar from '../../../../components/CheckAvatar';
import { cs } from './styles';

interface CommentItemProps {
    parentId: number | null
    avatar: string | null
    userName: string | null
    email: string | null
    text: string
    children: ReactNode
    onReplay: () => void
}

const CommentItem = ({ parentId, avatar, userName, email, text, onReplay, children }: CommentItemProps) => {
    const parentIdStyles = parentId ? 20 : 0;

    return (
        <>
            <View style={[cs.commentRow, { marginLeft: parentIdStyles }]}>
                <View style={positionHelpers.fill}>
                    <View style={positionHelpers.alignItemsCenterRow}>
                        <CheckAvatar avatar={avatar} />
                        <Text style={cs.commentText}>{userName}</Text>
                    </View>
                    <View style={positionHelpers.rowFillCenter}>
                        <View>
                            <Text style={cs.commentText}>Email: {email}</Text>
                            <Text style={cs.commentText}>Comment: {text}</Text>
                        </View>
                        <TouchableOpacity onPress={onReplay}>
                            <Text style={cs.replayText}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {children}
        </>
    );
};

export default CommentItem;
