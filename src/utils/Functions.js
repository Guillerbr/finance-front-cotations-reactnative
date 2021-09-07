import { Alert } from 'react-native';
import { queryHistoric } from "../api/Querys";

export function formatToLocale(value) {
    let formated = value.split('').reverse().join('').replace('.', ',').split('').reverse().join('')
    return parseFloat(formated).toFixed(2)
}

export function filterByDate(historic, startDate, endDate) {
    let start = convertDate(startDate)
    let end = convertDate(endDate)
    let data = historic.filter(i => convertDate(i.date) >= start && convertDate(i.date) <= end)
    return data
}

export function convertDate(date) {
    const dateSplit = date.split("-").reverse()
    const newDate = new Date(parseInt(dateSplit[2], 10),
        parseInt(dateSplit[1], 10) - 1,
        parseInt(dateSplit[0], 10))

    return newDate
}

export const catchHistoricPrice = async (input, startDate, endDate, navigation, colors) => {
    try {
        const historic = await queryHistoric(input.trim())
        let data = filterByDate(historic, startDate, endDate)

        navigation.navigate('DetailsScreen', {
            id: 'historicPrice',
            historic: data,
            colors,
        })
    } catch (error) {
        Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
    }
}

export const transformHistoricToArray = (data = {}) => {
    let transformed = Object.keys(data).map(e => {
        return {
            date: e,
            open: data[e]['1. open'],
            high: data[e]['2. high'],
            low: data[e]['3. low'],
            close: data[e]['4. close'],
        }
    })
    return transformed
}

