import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { formatToLocale } from '../utils/Functions';

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
        width: '48%',
        elevation: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})