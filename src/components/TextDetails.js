import React from 'react'
import { Text } from 'react-native'

export default function TextDetails({ colors, text }) {
    return <Text style={{
        fontSize: 16,
        color: colors.text
    }}>{text || 'undefined'}</Text>
}
