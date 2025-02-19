import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../styles';

export const cs = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 2,
        paddingBottom: 5,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBlockColor: colors.silver,
    },
    containerHeader: {
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        backgroundColor: colors.black,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    textHeader: {
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold',
    },
    textArrow: {
        fontSize: 30,
        color: colors.white,
    },
    containerContent: {
        backgroundColor: colors.silver,
        ...Platform.select({
            ios: {
                shadowColor: colors.silver2,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 1,
                elevation: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    contentButton: {
        borderBottomWidth: 1,
        borderBottomColor: colors.silver2,
        paddingVertical: 15,
    },
});
