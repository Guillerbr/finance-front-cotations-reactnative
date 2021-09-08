import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

import Card from './Card';
import ButtonDate from './ButtonDate';
import Input from './Input';

import { queryLastRefreshed } from '../api/Querys';
import { catchHistoricPrice, datesCheck, projectionGains } from '../utils/Functions';

export default function CompanyCards({ user, colors, company, navigation, input }) {

    const [showModal, setShowModal] = useState(false)
    const [showModalDate, setShowModalDate] = useState(false)

    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState('')
    const [whoIsModal, setWhoIsModal] = useState('')

    const [InputQuantify, setInputQuantify] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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

    const comparePrice = useCallback(async () => {
        navigation.navigate('DetailsScreen', {
            id: 'comparePrice',
            colors,
            company,
        })
    }, [company])

    const historicPrice = useCallback(() => {
        if (!showModal) {
            setShowModal(true)
            setWhoIsModal('historic')
        }
    }, [company, showModal])

    const gainsPrice = useCallback(() => {
        if (!showModal) {
            setShowModal(true)
            setWhoIsModal('gains')
        }
    }, [company, showModal])

    const confirmDate = useCallback((selectedDate) => {
        if (index === 'end') {
            if (startDate) {
                if (moment(selectedDate).isAfter(moment(startDate))) {
                    setEndDate(moment.utc(selectedDate).format('YYYY-MM-DD'))
                }
                else {
                    Alert.alert('Aviso', 'Data de fim, precisa ser após de início')
                }
            } else setEndDate(moment.utc(selectedDate).format('YYYY-MM-DD'))
        } else {
            if (endDate) {
                if (moment(selectedDate).isBefore(moment(endDate))) {
                    setStartDate(moment.utc(selectedDate).format('YYYY-MM-DD'))
                } else {
                    Alert.alert('Aviso', 'Data de início, precisa ser antes do fim')
                }
            } else setStartDate(moment.utc(selectedDate).format('YYYY-MM-DD'))
        }
        setShowModalDate(false)
    }, [index, startDate, endDate])

    const openDatePicker = (index) => {
        setShowModalDate(true)
        setIndex(index)
    }

    const goTo = async () => {
        setLoading(true)
        if (whoIsModal === 'historic') {
            if (datesCheck(startDate, endDate)) {
                await catchHistoricPrice(input, startDate, endDate, navigation, colors)
                clearStates()
            }
        } else if (whoIsModal === 'gains') {
            if (startDate, InputQuantify) {
                await projectionGains(input, startDate, InputQuantify, user, navigation, colors)
                clearStates()
            } else {
                Alert.alert('Aviso', 'Selecione começo e quantidade para continuar')
            }
        }
        setLoading(false)
    }

    const clearStates = useCallback(() => {
        setShowModal(false)
        setLoading(false)
        setInputQuantify('')
        setIndex('')
        setWhoIsModal('')
        setStartDate('')
        setEndDate('')
    }, [])

    return (
        <Animatable.View duration={2000} animation="fadeInUpBig" >

            <Modal
                onRequestClose={() => setShowModal(false)}
                visible={showModal}
                transparent={true}
                animationType={'fade'}>
                <View style={styles.mod}>

                    <LinearGradient
                        colors={[colors.primary, colors.secundary]}
                        start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0 }}
                        style={styles.viewDate}>

                        {loading ?
                            <ActivityIndicator
                                size={26}
                                color={colors.text}
                            />
                            :
                            <>
                                <ButtonDate
                                    onPress={() => openDatePicker('start')}
                                    colors={colors}
                                    icon={'date'}
                                    text={startDate || 'Início'}
                                />

                                {whoIsModal === 'historic' ? <ButtonDate
                                    onPress={() => openDatePicker('end')}
                                    colors={colors}
                                    icon={'date'}
                                    text={endDate || 'Fim'}
                                />

                                    :
                                    <Input
                                        colors={colors}
                                        placeholder={'Quantidade de ações'}
                                        change={(text) => setInputQuantify(text)}
                                        value={InputQuantify}
                                        onSubmit={goTo}
                                    />
                                }

                                <View style={styles.viewButtons}>

                                    <ButtonDate
                                        onPress={clearStates}
                                        colors={colors}
                                        text={'Fechar'}
                                    />
                                    <ButtonDate
                                        onPress={goTo}
                                        colors={colors}
                                        text={'Confirmar'}
                                    />
                                </View>
                            </>
                        }
                    </LinearGradient>

                </View>
            </Modal>

            <View style={styles.column}>
                <Card onPress={currentPrice} text={'Preço atual'} colors={colors} />
                <Card onPress={historicPrice} text={'Preço histórico'} colors={colors} />
            </View>

            <View style={styles.column}>
                <Card onPress={comparePrice} text={'Preço atual em comparação'} colors={colors} />
                <Card onPress={gainsPrice} text={'Projeção de ganhos'} colors={colors} />
            </View>

            <DateTimePickerModal
                isVisible={showModalDate}
                mode="date"
                maximumDate={new Date()}
                onConfirm={confirmDate}
                onCancel={() => setShowModalDate(false)}
            />
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
    mod: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButtons: {
        flexDirection: 'row'
    },
    viewDate: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
})