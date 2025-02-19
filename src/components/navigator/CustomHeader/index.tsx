import React from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ButtonDefault from '../../UI/ButtonDefault';
import { cs } from './styles';

const BACK_TEXT = '<- Back';

interface CustomHeaderProps {
    title: string;
    showBackBtn?: boolean
}

const CustomHeader = ({ title, showBackBtn = false }: CustomHeaderProps) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const paddingInsets = insets.top ? insets.top + 10 : 20;

    return (
        <View
            style={[
                showBackBtn ? cs.container : cs.containerTwo,
                {
                    paddingTop: paddingInsets,
                },
            ]}>
            {!!showBackBtn && <ButtonDefault onPress={() => navigation.goBack()}>
                <Text style={cs.textHeader}>
                    {BACK_TEXT}
                </Text>
            </ButtonDefault>}
            <Text style={cs.textHeader}>
                {title}
            </Text>
            {!!showBackBtn && <ButtonDefault buttoStyles={{ opacity: 0 }} onPress={() => true}>
                <Text style={cs.textHeader}>
                    {BACK_TEXT}
                </Text>
            </ButtonDefault>}
        </View>
    );
};

export default CustomHeader;
