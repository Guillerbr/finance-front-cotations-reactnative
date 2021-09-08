import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, ActivityIndicator, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInputMask } from 'react-native-masked-text';
import { Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import useStateWithCallback from '../hooks/useStateWithCallback';

import { imageUrl } from '../utils/Keys';
import { setToken } from '../services/Auth';

export default function HomeScreen({ navigation }) {

    const { colors } = useTheme()

    const [loading, setLoading] = useStateWithCallback(false)
    const [data, setData] = useState({
        username: '',
        maskedValue: '',
        value: 0,
        checkUserName: false,
        checkValue: false,
        isValidUser: true,
        isValidValue: true,
    })

    const handleValidUser = (text) => {
        if (text.trim().length >= 4) {
            setData({
                ...data,
                username: text,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: text,
                isValidUser: false
            })
        }
    }

    const handleValueChange = (maskedValue, value) => {
        if (value >= 500) {
            setData({
                ...data,
                maskedValue,
                value,
                isValidValue: true
            })
        } else {
            setData({
                ...data,
                maskedValue,
                value,
                isValidValue: false
            })
        }
    }

    const verification = () => {
        if (data.isValidUser && data.username && data.isValidValue && data.maskedValue) return true
        Alert.alert('Aviso', 'Preencha e valide todos os campos para continuar')
        return false
    }

    const handlerEnter = (user) => {
        const newUser = {
            name: user.username,
            money: user.value
        }

        if (verification() && !loading) {
            setLoading(true, async () => {
                await setToken(JSON.stringify(newUser)).then(() => {
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'FinanceScreen',
                            }]
                        })
                    }, 1000)
                }).catch((e) => {
                    setLoading(false, () => Alert.alert('Aviso', e))
                })
            })
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl }}
                style={StyleSheet.absoluteFillObject}
            />
            <Animatable.View duration={2000} animation="fadeInLeftBig"
                style={styles.header}>
                <Text style={styles.textHeader}>Bem-vindo!</Text>
            </Animatable.View>

            <Animatable.View
                duration={2000}
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}>

                <Text style={[styles.textFooter, {
                    color: colors.text
                }]}>Usuário</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Digite seu nome"
                        placeholderTextColor={colors.placeholder}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        value={data.username}
                        autoCapitalize="none"
                        onChangeText={(text) => handleValidUser(text)}
                    />
                    {data.isValidUser && data.username ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>
                {data.isValidUser ||
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>O nome de usuário deve ter pelo menos 4 caracteres</Text>
                    </Animatable.View>
                }

                <Text style={[styles.textFooter, {
                    color: colors.text,
                    marginTop: 15
                }]}>Valor</Text>
                <View style={styles.action}>
                    <Entypo
                        name="credit"
                        color={colors.text}
                        size={20}
                    />
                    <TextInputMask
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: ''
                        }}
                        keyboardType={'numeric'}
                        value={data.maskedValue}
                        placeholder="Digite o valor"
                        placeholderTextColor={colors.placeholder}
                        checkValue={data.checkValue ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onSubmitEditing={() => handlerEnter(data)}
                        includeRawValueInChangeText={true}
                        onChangeText={(maskedValue, value) => handleValueChange(maskedValue, value)}
                    />
                    {data.isValidValue && data.maskedValue ?
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                    }
                </View>
                {data.isValidValue ||
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Valor precisa ser maior do que R$500</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        testId={'loginButton'}
                        style={styles.onDashboard}
                        onPress={() => handlerEnter(data)}>
                        <LinearGradient
                            colors={[colors.primary, colors.secundary]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={styles.onDashboard}>
                            <Text style={[styles.textEnter, {
                                color: colors.textHeader
                            }]}>
                                {loading ? <ActivityIndicator size={'small'} color={'white'} /> : 'Entrar'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28
    },
    textFooter: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 2,
        borderBottomWidth: 1.5,
        borderBottomColor: '#d1d1d1',
    },
    actionError: {
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    onDashboard: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textEnter: {
        fontSize: 17,
    }
})