export function queryCompare(input, list) {
    let data = []

    for (let i = 0; i < 4; i++) {
        if (input.toUpperCase().trim() === list[i].symbol.toUpperCase()) data.push(list[4])
        else data.push(list[i])
    }
    return data
}

export function formatToLocale(value) {
    let formated = value.split('').reverse().join('').replace('.', ',').split('').reverse().join('')
    return formated
}
