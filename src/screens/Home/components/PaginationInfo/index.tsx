import React from 'react';
import { View } from 'react-native';
import ButtonDefault from '../../../../components/UI/ButtonDefault';
import { Text } from 'react-native-gesture-handler';
import { positionHelpers } from '../../../../styles';
import { cs } from './styles';

interface PaginationInfoProps {
    page: number
    prevClick: () => void
    nextClick: () => void
}

const PaginationInfo = ({ page, prevClick, nextClick }: PaginationInfoProps) => {
    return (
        <View style={[positionHelpers.rowFill, cs.mh15]}>
            <ButtonDefault
                buttoStyles={cs.paginationButton}
                title="Previous"
                onPress={prevClick}
            />
            <Text>{page}</Text>
            <ButtonDefault
                buttoStyles={cs.paginationButton}
                title="Next"
                onPress={nextClick}
            />
        </View>
    );
};

export default PaginationInfo;
