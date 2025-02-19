import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigatorContainer from './StackNavigator';

const NavigationContainerScreen = () => {
    return (
        <NavigationContainer >
            <StackNavigatorContainer />
        </NavigationContainer>
    );
};

export default NavigationContainerScreen;
