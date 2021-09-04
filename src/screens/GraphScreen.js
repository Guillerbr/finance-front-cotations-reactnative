import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryDidMount } from '../api/queryDidMount';

export default function GraphScreen({ route, navigation }) {
    const { colors } = useTheme()

    const [data, setData] = useState([])

    useEffect(() => {
        queryDidMount().then((e) => setData(e)).catch((e) => console.log(e))
    }, [])

    const resetPress = () => {
        AsyncStorage.clear().then(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'GraphScreen',
                }]
            })
        })
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.primary
        }]}>

            <Header onPress={resetPress} text={'Finanças'} colors={colors} />

            <View style={[styles.body, {
                backgroundColor: colors.background
            }]}>
                <Text style={[styles.input]}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {

    },
    body: {
        flex: 1,
        borderTopLeftRadius: 30
    },
    input: {

    }
})