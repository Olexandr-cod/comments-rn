import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

export const cs = StyleSheet.create({
    commentText: {
        fontSize: 16,
        padding: 2,
    },
    commentRow: {
        padding: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 10,
        backgroundColor: colors.silver2,
    },
    replayText: {
        color: colors.blue,
        marginRight: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
