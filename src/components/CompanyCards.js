import React, { useState, useCallback } from 'react'
import { View, Platform, StyleSheet, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Card from './Card';
import DateTimePicker from '@react-native-community/datetimepicker';
import { queryHistoric, queryLastRefreshed } from '../api/Querys';

export default function CompanyCards({ colors, company, navigation, input }) {
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState('date')
    const [date, setDate] = useState(new Date(1598051730000))

    const currentPrice = useCallback(async () => {
        try {
            const LastRefreshed = await queryLastRefreshed(input.trim())
            navigation.navigate('DetailsScreen', {
                id: 'currentPrice',
                company,
                refresh: LastRefreshed['Meta Data'],
                colors,
            })
        } catch (error) {
            Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
        }
    }, [company])

    const historicPrice = useCallback(async () => {
        try {
            const historic = await queryHistoric(input.trim())
            navigation.navigate('DetailsScreen', {
                id: 'historicPrice',
                historic,
                colors,
            })
        } catch (error) {
            Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
        }
    }, [company])

    const comparePrice = useCallback(async () => {
        navigation.navigate('DetailsScreen', {
            id: 'comparePrice',
            colors,
            company,
        })
    }, [company])

    const gainsPrice = useCallback(async () => {
        setShowModal(true)
    }, [company])

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowModal(Platform.OS === 'ios')
        setDate(currentDate)
    }

    return (
        <Animatable.View duration={2000} animation="fadeInUpBig" >
            {showModal ?
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
                : null
            }

            <View style={styles.column}>
                <Card onPress={currentPrice} text={'Preço atual'} colors={colors} />
                <Card onPress={historicPrice} text={'Preço histórico'} colors={colors} />
            </View>

            <View style={styles.column}>
                <Card onPress={comparePrice} text={'Preço atual em comparação'} colors={colors} />
                <Card onPress={gainsPrice} text={'Projeção de ganhos'} colors={colors} />
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingTop: '1%',
        paddingBottom: '4%'
    },
})