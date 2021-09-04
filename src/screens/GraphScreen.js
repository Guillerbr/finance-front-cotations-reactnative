import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import Header from '../components/Header'
import { Entypo } from '@expo/vector-icons';

export default function GraphScreen({ route }) {
    const { colors } = useTheme()

    const resetPress = () => {
        console.log('Pressed')
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.primary
        }]}>

            <Header onPress={resetPress} text={'GraphScreen'} colors={colors} />

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