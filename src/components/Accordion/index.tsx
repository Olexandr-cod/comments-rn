import React, { useState } from 'react';
import ButtonDefault from '../UI/ButtonDefault';
import { positionHelpers } from '../../styles';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { cs } from './styles';

interface AccordionProps {
    children?: React.ReactNode;
    titleHeader: string;
    containerStyle?: StyleProp<ViewStyle>;
}

const Accordion = ({ titleHeader, containerStyle, children }: AccordionProps) => {
    const [showContent, setShowContent] = useState<boolean>(false);

    return (
        <ButtonDefault
            activeOpacity={0.8}
            buttoStyles={[
                positionHelpers.overflowHidden,
                cs.container,
            ]}
            onPress={() => setShowContent(!showContent)}>
            <View
                style={[
                    containerStyle,
                    positionHelpers.rowFillCenter,
                    cs.containerHeader,
                ]}>
                <Text style={cs.textHeader}>
                    {titleHeader}
                </Text>
                <View style={{ transform: [{ rotate: showContent ? '180deg' : '90deg' }] }}>
                    <Text style={cs.textArrow}>{'^'}</Text>
                </View>
            </View>

            {showContent && (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowContent(false)}>
                    {children}
                </TouchableOpacity>
            )}
        </ButtonDefault>
    );
};

export default Accordion;
