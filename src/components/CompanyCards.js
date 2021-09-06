import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Card from './Card';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CompanyCards({ user, colors, price, gains, historic, compare }) {

    const currentPrice = () => {

    }

    const historicPrice = () => {

    }

    const gainsPrice = () => {

    }

    const comparePrice = () => {

    }

    return (
        <Animatable.View duration={2000} animation="fadeInUpBig" >
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
        paddingHorizontal: '4%',
        paddingTop: '1%',
        paddingBottom: '4%'
    },
})