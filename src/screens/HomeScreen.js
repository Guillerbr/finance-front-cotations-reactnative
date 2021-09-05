import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, ActivityIndicator, Image, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { TextInputMask } from 'react-native-masked-text'
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import useStateWithCallback from '../hooks/useStateWithCallback';
import { imagemUrl } from '../utils/Keys';
import { setToken } from '../services/Auth';

export default function HomeScreen({ navigation }) {
    const { colors } = useTheme()
    const [loading, setLoading] = useStateWithCallback(false)

    const [data, setData] = useState({
        username: '',
        maskedValue: '',
        value: 500,
        check_textInputChange: false,
        secureTextEntry: false,
        isValidUser: true,
        isValidValue: true,
    })

    const textInputChange = (text) => {
        if (text.trim().length >= 4) {
            setData({
                ...data,
                username: text,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: text,
                check_textInputChange: false,
                isValidUser: false
            })
        }
    }

    const handleValidUser = (text) => {
        if (text.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            })
        } else {
            setData({
                ...data,
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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const verification = () => {
        if (data.isValidUser && data.username && data.isValidValue && data.maskedValue) return true
        Alert.alert('Aviso', 'Preencha e valide todos os campos para continuar')
        return false
    }

    const handlerEnter = (user) => {
        if (verification() && !loading) {
            setLoading(true, async () => {
                await new setToken('user').then(() => {
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'FinanceScreen',
                                params: user
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
                source={{ uri: imagemUrl }}
                style={StyleSheet.absoluteFillObject}
            />
            <Animatable.View animation="fadeInLeftBig"
                style={styles.header}>
                <Text style={styles.textHeader}>Bem-vindo!</Text>
            </Animatable.View>

            <Animatable.View
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
                        placeholder="Seu nome"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(text) => textInputChange(text)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange &&
                        <Animatable.View animation="bounceIn">
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
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
                    <FontAwesome
                        name="money"
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
                        placeholder="Digite o valor em R$"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onSubmitEditing={() => handlerEnter(data)}
                        includeRawValueInChangeText={true}
                        onChangeText={(maskedValue, value) => handleValueChange(maskedValue, value)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidValue ||
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Valor precisa ser maior do que R$500</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.onDashboard}
                        onPress={() => handlerEnter(data)}>
                        <LinearGradient
                            colors={[colors.primary, colors.secundary]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={styles.onDashboard}>
                            <Text style={[styles.textEnter, {
                                color: colors.text
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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