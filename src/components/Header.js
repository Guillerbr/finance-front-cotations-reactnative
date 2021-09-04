import React from 'react'
import { View, Text, Platform, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Header({ text, size, colors, onPress }) {
    const { width } = useWindowDimensions()

    return (
        <>
            <View style={{
                height: Platform.OS === 'ios' ? 20 : 0,
                backgroundColor: colors.primary,
                width,
            }} />
            <View
                style={{
                    backgroundColor: colors.background,
                    height: Platform.OS === 'ios' || 20,
                    width,
                    paddingVertical: 30,
                    position: 'absolute'
                }}
            />
            <View style={{
                height: Platform.OS === 'ios' || 20,
                backgroundColor: colors.primary || '#d1d1d1',
                width,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 30,
                borderBottomRightRadius: 30,
            }}>
                <View
                    style={{
                        position: 'absolute',
                        left: 10,
                        padding: 10
                    }}>
                    <Entypo
                        name="trash"
                        color={'transparent'}
                        size={24}
                    />
                </View>

                <Text style={{
                    fontSize: size || 18,
                    color: colors.textHeader || 'white',
                }}>{text}</Text>

                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        position: 'absolute',
                        right: 10,
                        padding: 10
                    }}>
                    <Entypo
                        name="trash"
                        color={colors.textHeader}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
