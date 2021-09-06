import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Keyboard, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchInput from '../components/SearchInput';
import Header from '../components/Header';

import { getToken } from '../services/Auth';
import { queryCompany, queryEarnings, queryHistoric } from '../api/Querys';
import CompanyInfos from '../components/CompanyInfos';

const actions = [{
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

    const [loading, setLoaidng] = useState(true)
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

    const Search = async () => {
        Keyboard.dismiss()

        if (loading) {

            try {
                let company = await queryCompany(input.trim())
                setPrice(company["Global Quote"] || 'undefined')

            } catch (error) {
                Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
            }

            try {
                let Earnings = await queryEarnings(input.trim())
                setGains({
                    quarterly: Object.values(Earnings["quarterlyEarnings"])[0] || 'undefined',
                    annual: Object.values(Earnings["annualEarnings"])[0] || 'undefined'
                })
            } catch (error) {
                Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
            }

            try {
                let Historic = await queryHistoric(input.trim())

                setHistoric(Object.entries(Historic["Monthly Time Series"]) || 'undefined')

            } catch (error) {
                Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
            }

            try {
                let data = []
                for (let i = 0; i < 4; i++) {
                    if (input.toUpperCase().trim() === actions[i].symbol.toUpperCase()) data.push(actions[4])
                    else data.push(actions[i])
                }

                setCompare(data)
            } catch (error) {
                Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
            }
        }
    }

    return (
        <View style={[styles.container, {
            backgroundColor: colors.background
        }]}>

            <Header
                onPress={resetPress}
                user={user}
                text={'Finanças'}
                colors={colors}
            />

            <View style={[styles.body, {
                backgroundColor: colors.primary
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
            </View>

        </View>
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
})