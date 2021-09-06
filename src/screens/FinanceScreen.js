import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchInput from '../components/SearchInput';
import Header from '../components/Header';

import { getToken } from '../services/Auth';
import { queryCompany, queryEarnings } from '../api/Querys';
import CompanyDetails from '../components/CompanyDetails';

export default function GraphScreen({ route, navigation }) {
    const { colors } = useTheme()
    const { width, height } = useWindowDimensions()

    const [user, setUser] = useState({})
    const [data, setData] = useState({})
    const [gains, setGains] = useState({})
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

    const Search = () => {
        Keyboard.dismiss()

        queryCompany(input).then(res => {
            setData(Object.values(res["Time Series (Daily)"])[0])
        }).catch(e => {
            setData({})
            console.log(e)
        })

        queryEarnings(input).then(res => {
            setGains({
                quarterly: Object.values(res["quarterlyEarnings"])[0],
                annual: Object.values(res["annualEarnings"])[0]
            })
        }).catch(e => {
            setGains({})
            console.log(e)
        })
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

                {Object.keys(data).length > 0 &&
                    <CompanyDetails
                        user={user}
                        colors={colors}
                        data={data}
                        gains={gains}
                    />
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