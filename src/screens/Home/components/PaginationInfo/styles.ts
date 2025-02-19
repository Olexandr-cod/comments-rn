import { StyleSheet } from 'react-native';
import { colors } from '../../../../styles';

export const cs = StyleSheet.create({
    mh15: {
        marginHorizontal: 15,
    },
    paginationButton: {
        minWidth: '25%',
        alignItems: 'center',
        padding: 3,
        backgroundColor: colors.black,
        borderRadius: 10,
    },
});
