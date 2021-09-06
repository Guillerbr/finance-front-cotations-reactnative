import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Keyboard, Alert, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import SearchInput from '../components/SearchInput';
import Header from '../components/Header';
import CompanyInfos from '../components/CompanyInfos';

import { getToken } from '../services/Auth';
import { queryCompany, queryEarnings, queryHistoric } from '../api/Querys';
import { queryCompare } from '../utils/Functions';

const list = [{
    symbol: 'AAPL',
    price: '154,30',
},
{
    symbol: 'SBUX',
    price: '117,19'
},
{
    symbol: 'DOW J',
    price: '35.369,09'
},
{
    symbol: 'NKE',
    price: '163,29'
},
{
    symbol: '^BVSP',
    price: '116.993'
}]

export default function GraphScreen({ route, navigation }) {
    const { colors } = useTheme()
    const { width, height } = useWindowDimensions()

    const [price, setPrice] = useState({})
    const [gains, setGains] = useState({})
    const [historic, setHistoric] = useState({})
    const [compare, setCompare] = useState({})

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
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
            const earnings = await queryEarnings(input.trim())
            const historic = await queryHistoric(input.trim())

            setPrice(company["Global Quote"])
            setGains({
                quarterly: Object.values(earnings["quarterlyEarnings"])[0],
                annual: Object.values(earnings["annualEarnings"])[0]
            })
            setHistoric(Object.entries(historic["Monthly Time Series"]))
            setCompare(queryCompare(input, list))

        } catch (error) {
            Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')

        }

        setLoading(true)
    }

    const Search = async () => {
        Keyboard.dismiss()

        if (!input) {
            setPrice({})
            setGains({})
            setHistoric({})
            setCompare({})
        }
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

            <View
                style={[styles.body, {
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
                <ScrollView contentContainerStyle={{
                    paddingVertical: 0
                }}>


                    <SearchInput
                        value={input}
                        onPress={Search}
                        placeholder={'Pesquisa'}
                        colors={colors}
                        change={(text) => setInput(text)}
                    />

                    {Object.keys(price).length > 0 && Object.keys(gains).length > 0 && Object.keys(historic).length > 0 && Object.keys(compare).length > 0 ?
                        <CompanyInfos
                            user={user}
                            colors={colors}
                            price={price}
                            gains={gains}
                            historic={historic}
                            compare={compare}
                        />
                        : null
                    }

                </ScrollView>

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