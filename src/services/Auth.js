import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    const Auth = await AsyncStorage.getItem('Auth')
    return Auth !== null
}

export const setToken = async (uid) => await AsyncStorage.setItem('Auth', uid)