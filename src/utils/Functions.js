import { Alert } from 'react-native';
import { queryList } from "../api/Querys";
import moment from 'moment';

export const catchHistoricPrice = async (input, startDate, endDate, navigation, colors) => {
    try {
        const historic = await queryList(input.trim())
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

export const projectionGains = async (input, startDate, InputQuantify, user, navigation, colors) => {
    try {
        const gains = await queryList(input.trim())

        let value = user.money
        let data = filterDate(gains, startDate)

        let start = moment(startDate).format('DD/MM/YYYY')
        let now = moment(new Date).format('DD/MM/YYYY')

        let difDays = moment(now, "DD/MM/YYYY").diff(moment(start, "DD/MM/YYYY"))
        let days = moment.duration(difDays).asDays()

        let pricePay = parseInt(InputQuantify) * parseFloat(data.start["open"])
        let calc = pricePay * days

        let diff = parseFloat(data.end["open"]) - parseFloat(data.start["open"])
        let profitInPortfolio = parseFloat(days) * parseFloat(diff)

        navigation.navigate('DetailsScreen', {
            id: 'gainsPrice',
            gains: data,
            profitInPortfolio,
            pricePay,
            diff,
            value,
            calc,
            colors,
        })
    } catch (error) {
        Alert.alert('Alerta', 'Aguarde alguns segundos e tente novamente')
    }
}

export function filterDate(ref, startDate) {
    let start = convertDate(startDate)
    let data = ref.filter(i => convertDate(i.date) >= start)

    let res = {
        end: data[0],
        start: data.reverse()[0]
    }

    return res
}

export function filterByDate(ref, startDate, endDate) {
    let start = convertDate(startDate)
    let end = convertDate(endDate)
    let data = ref.filter(i => convertDate(i.date) >= start && convertDate(i.date) <= end)
    return data
}

export function convertDate(date) {
    const dateSplit = date.split("-").reverse()
    const newDate = new Date(parseInt(dateSplit[2], 10),
        parseInt(dateSplit[1], 10) - 1,
        parseInt(dateSplit[0], 10))

    return newDate
}

export function formatToLocale(value) {
    let toNumber = (parseFloat(value).toFixed(2))
    let formated = toNumber.toString().split('').reverse().join('').replace('.', ',').split('').reverse().join('')
    return formated
}

export const datesCheck = (startDate, endDate) => {
    if (startDate && endDate) {
        if (startDate !== endDate) {
            return true
        }
    }

    Alert.alert('Aviso', 'Selecione começo e fim diferentes para continuar')
    return false
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
