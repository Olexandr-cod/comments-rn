import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const cs = StyleSheet.create({
    input: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 8,
    },
    inputDark: {
        borderWidth: 1,
        marginBottom: 5,
        padding: 8,
        borderColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
    captchaText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    comment: {
        borderBottomWidth: 1,
        padding: 5,
    },
    lightTheme: {
        backgroundColor: '#fff',
    },
    darkTheme: {
        backgroundColor: '#333',
        color: '#fff',
    },
    tableTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    containerForms: {
        marginHorizontal: 20,
    },
    imgButton: {
        minWidth: '50%',
        padding: 3,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.black,
        marginVertical: 5,
    },
    imgSelected: {
        width: 80,
        height: 80,
        margin: 5,
    },
    addComentButton: {
        minWidth: '25%',
        alignItems: 'center',
        padding: 3,
        backgroundColor: colors.silver1,
        borderRadius: 10,
    },
    formContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        minHeight: 60,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 10,
    },
    imageButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    mh15: {
        marginHorizontal: 15,
    },
});
