import { apiKey } from '../utils/Keys';
import { transformHistoricToArray } from '../utils/Functions';

export async function queryCompany(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${input}&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note') || Object.keys(json).includes('Information'))
                reject({ status: 'error', error: error })
            resolve(json)
        }).catch(error => reject({ status: 'error', error: error }))
    })
}


export async function queryLastRefreshed(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${input}&interval=5min&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note') || Object.keys(json).includes('Information'))
                reject({ status: 'error', error: error })
            resolve(json)
        }).catch(error => reject({ status: 'error', error: error }))
    })
}

export async function queryList(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${input}&outputsize=full&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note'))
                reject({ status: 'error', error: error })
            resolve(transformHistoricToArray(json["Time Series (Daily)"]))
        }).catch(error => reject({ status: 'error', error: error }))
    })
}
