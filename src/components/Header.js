import React from 'react'
import { View, Text, Platform } from 'react-native';

export default function Header({ text, size, colors }) {

    return (
        <>
            <View style={{
                height: Platform.OS === 'ios' ? 20 : 0,
                backgroundColor: colors.primary,
                width: "100%",
            }} />
            <View
                style={{
                    backgroundColor: colors.background,
                    height: Platform.OS === 'ios' || 20,
                    width: "100%",
                    paddingVertical: 30,
                    position: 'absolute'
                }}
            />
            <View style={{
                height: Platform.OS === 'ios' || 20,
                backgroundColor: colors.primary || '#d1d1d1',
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 30,
                borderBottomRightRadius: 50,
            }}>
                <Text style={{
                    fontSize: size || 17,
                    color: colors.textHeader || 'white',
                }}>{text}</Text>
            </View>
        </>
    )
}
