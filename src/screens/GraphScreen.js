import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../components/Header'

export default function GraphScreen({ route }) {
    return (
        <View style={styles.container}>

            <Header text={'GraphScreen'} />

            <View style={styles.body}>
                <Text style={styles.input}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {

    },
    body: {

    },
    input: {

    }
})