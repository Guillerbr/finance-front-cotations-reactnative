import { apiKey } from '../utils/Keys';

export async function queryCompany(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${input}&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note'))
                reject({ status: 'error', error: error })
            resolve(json)
        }).catch(error => reject({ status: 'error', error: error }))
    })
}

export async function queryEarnings(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${input}&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note'))
                reject({ status: 'error', error: error })
            resolve(json)
        }).catch(error => reject({ status: 'error', error: error }))
    })
}

export async function queryHistoric(input) {
    return new Promise(function (resolve, reject) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${input}&apikey=${apiKey}`

        fetch(url).then(resp => {
            return resp.json()
        }).then((json) => {
            if (Object.keys(json).includes('Note'))
                reject({ status: 'error', error: error })
            resolve(json)
        }).catch(error => reject({ status: 'error', error: error }))
    })
}
