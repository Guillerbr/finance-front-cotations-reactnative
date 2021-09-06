import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Card({ colors, text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, {
            backgroundColor: colors.backgroundCards
        }]}>
            <Text style={[styles.text, {
                color: colors.text
            }]}>{text || 'undefined'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '47%',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})