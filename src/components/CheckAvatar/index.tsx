import React from 'react';
import { Image, View } from 'react-native';
import { cs } from './styles';

interface CheckAvatarProps {
    avatar: string | null
}

const CheckAvatar = ({ avatar }: CheckAvatarProps) => {
    return (
        <>
            {
                avatar ? (
                    <Image source={{ uri: `data:image/jpeg;base64,${avatar}` }} style={cs.avatar} />
                ) : (
                    <View style={cs.noAvatar} />
                )}
        </>
    );
};

export default CheckAvatar;
