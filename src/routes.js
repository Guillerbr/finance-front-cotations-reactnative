import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import GraphScreen from './screens/GraphScreen';

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
                initialRouteName={token ? 'GraphScreen' : 'HomeScreen'}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="GraphScreen" component={GraphScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Routes = () => {
    const scheme = useColorScheme()
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(false)

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
            <StatusBar barStyle={scheme == 'dark' ? 'dark-content' : 'light-content'} />
            <AppScreens token={token} />
        </NavigationContainer>
    )
}

export default Routes
