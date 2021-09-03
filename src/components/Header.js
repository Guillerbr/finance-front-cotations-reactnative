import React from 'react'
import { View, Text, Platform } from 'react-native'
import Colors from '../utils/Colors'

export default function Header({ text, size, fontColor }) {
    return (
        <>
            <View style={{
                height: Platform.OS === 'ios' ? 20 : 0,
                backgroundColor: Colors.primary,
                width: "100%",
            }} />
            <View style={{
                height: Platform.OS === 'ios' || 20,
                backgroundColor: Colors.primary || '#d1d1d1',
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                padding: 30
            }}>
                <Text style={{
                    fontSize: size || 17,
                    color: fontColor || 'white',
                }}>{text}</Text>
            </View>
        </>
    )
}
