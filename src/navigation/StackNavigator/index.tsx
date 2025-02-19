import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from '../../components/navigator/CustomHeader';
import { DASHBOARD_ROUTES } from '../routes';

// Stack
import HomeScreen from '../../screens/Home';

const Stack = createStackNavigator();

const StackNavigatorContainer = () => {
    return (
        <Stack.Navigator initialRouteName={DASHBOARD_ROUTES.HOME_SCREEN}>
            <Stack.Screen
                name={DASHBOARD_ROUTES.HOME_SCREEN}
                component={HomeScreen}
                options={{
                    header: () => <CustomHeader title="Home" />,
                }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigatorContainer;
