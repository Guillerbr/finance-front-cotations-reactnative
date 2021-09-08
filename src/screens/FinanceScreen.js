import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Keyboard, Alert, Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import SearchInput from '../components/SearchInput';
import Header from '../components/Header';
import CompanyCards from '../components/CompanyCards';

import { getToken } from '../services/Auth';
import { queryCompany } from '../api/Querys';

export default function FinanceScreen({ navigation }) {
    const { colors } = useTheme()
    const { width, height } = useWindowDimensions()

    const [user, setUser] = useState({})
    const [company, setCompany] = useState({})

    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')

    useEffect(() => {
        getToken().then((e) => {
            setUser(JSON.parse(e))
        }).catch((e) => console.log(e))
    }, [])

    const resetPress = () => {
        AsyncStorage.clear().then(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'HomeScreen',
                }]
            })
        })
    }

    async function LoadingData() {
        try {
            const company = await queryCompany(input.trim())
            setCompany(company["Global Quote"])
        } catch (error) {
            Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
        }
        setLoading(true)
    }

    const Search = async () => {
        Keyboard.dismiss()

        if (!input)
            setCompany({})

        else if (loading) {
            setLoading(false)
            LoadingData()
        }
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.background
        }]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={!loading}>
                <View style={styles.mod}>
                    <LinearGradient
                        colors={[colors.primary, colors.secundary]}
                        start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0 }}
                        style={styles.indicator}>
                        <ActivityIndicator
                            size={'large'}
                            color={'white'}
                        />
                    </LinearGradient>
                </View>
            </Modal>

            <Header
                onPress={resetPress}
                user={user}
                text={'Finanças'}
                colors={colors}
            />

            <View style={[styles.body, {
                backgroundColor: colors.primary,
            }]}>

                <View
                    style={[StyleSheet.absoluteFillObject, {
                        backgroundColor: colors.background,
                        height,
                        width,
                        borderTopLeftRadius: 30
                    }]}
                />

                <SearchInput
                    value={input}
                    onPress={Search}
                    placeholder={'Pesquisa'}
                    colors={colors}
                    change={(text) => setInput(text)}
                />

                {Object.keys(company).length > 0 ?
                    <CompanyCards
                        user={user}
                        colors={colors}
                        company={company}
                        navigation={navigation}
                        input={input}
                    />
                    : null
                }

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 0,
    },
    mod: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        padding: 30,
        borderRadius: 20
    }
})