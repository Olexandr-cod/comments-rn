import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const cs = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30,
        margin: 5,
        borderRadius: 10,
    },
    noAvatar: {
        width: 30,
        height: 30,
        margin: 5,
        borderRadius: 10,
        backgroundColor: colors.silver1,
    },
});
