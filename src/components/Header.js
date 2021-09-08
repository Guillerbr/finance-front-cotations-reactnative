import React, { useState } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function Header({ text, size, colors, onPress, user }) {

    const { width } = useWindowDimensions()

    const [secureTextEntry, setSecureTextEntry] = useState(false)

    return (
        <LinearGradient
            colors={[colors.primary, colors.secundary]}
            start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0 }}
            style={{
                borderBottomRightRadius: 30,
            }}>
            <Animatable.View duration={2000} animation="fadeInLeftBig">
                <View style={{
                    height: 22,
                    width,
                }} />
                <View
                    style={{
                        width,
                        paddingVertical: 10,
                        position: 'absolute'
                    }}
                />
                <View style={{
                    width,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10
                }}>
                    <View
                        style={{
                            position: 'absolute',
                            left: 10,
                            padding: 10
                        }}>
                        <MaterialIcons
                            name="logout"
                            color={'transparent'}
                            size={24}
                        />
                    </View>

                    <Text style={{
                        fontSize: size || 18,
                        color: colors.textHeader || 'white',
                    }}>
                        {text}
                    </Text>

                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            position: 'absolute',
                            right: 10,
                            padding: 10
                        }}>
                        <MaterialIcons
                            name="logout"
                            color={colors.textHeader}
                            size={24}
                        />
                    </TouchableOpacity>
                </View>

                <TextInput
                    editable={false}
                    style={{
                        color: colors.textHeader,
                        fontSize: 16,
                        borderBottomWidth: 1.5,
                        marginHorizontal: 20,
                        paddingTop: 0,
                        paddingBottom: 5,
                        borderColor: colors.textHeader,
                    }}
                    value={user.name ? 'Olá, ' + user.name.toString() : ''}
                />

                <View style={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderBottomRightRadius: 30,
                    justifyContent: 'center',
                    paddingHorizontal: 25,
                }}>

                    <Text style={{
                        color: colors.textHeader,
                        fontSize: 17,
                    }}>Saldo disponível</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TextInput
                            style={{
                                color: colors.textHeader,
                                fontSize: 16,
                                marginTop: -5,
                                width: width * 0.25
                            }}
                            secureTextEntry={secureTextEntry}
                            editable={false}
                            value={user.money ? 'R$' + user.money.toFixed(2).toString() : ''}
                        />

                        <TouchableOpacity
                            style={{
                                marginTop: -7,
                                marginLeft: 5
                            }}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Feather
                                name={secureTextEntry ? "eye-off" : "eye"}
                                color={colors.textHeader}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </LinearGradient>
    )
}