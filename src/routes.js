import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import FinanceScreen from './screens/FinanceScreen';
import DetailsScreen from './screens/DetailsScreen';

import { getToken } from './services/Auth';

const Stack = createStackNavigator()

const AppScreens = ({ token }) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
                }}
                initialRouteName={token ? 'FinanceScreen' : 'HomeScreen'}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="FinanceScreen" component={FinanceScreen} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Routes = () => {
    const scheme = useColorScheme()
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(false)

    useEffect(() => {
        LogBox.ignoreLogs(['Require cycle:'])
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])
    }, [])

    useEffect(() => {
        async function initialVerifications() {
            if (await getToken()) {
                setToken(true)
            }
            setIsLoading(false)
        }

        initialVerifications()
    }, [])

    if (isLoading) return null

    return (
        <NavigationContainer>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={scheme == 'dark' ? 'dark-content' : 'light-content'} />
            <AppScreens token={token} />
        </NavigationContainer>
    )
}

export default Routes
