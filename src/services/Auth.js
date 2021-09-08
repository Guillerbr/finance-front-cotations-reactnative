import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => await AsyncStorage.getItem('Auth')

export const setToken = async (uid) => await AsyncStorage.setItem('Auth', uid)