import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { formatToLocale } from '../utils/Functions';

export default function CompanyInfos({ user, colors, price, gains, historic, compare }) {
    return (
        <Animatable.View duration={2000} animation="fadeInUpBig" >
            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço Atual</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>{price["01. symbol"]}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Preço: {'R$' + formatToLocale((parseFloat(price["05. price"])).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Abertura: {'R$' + formatToLocale((parseFloat(price["02. open"])).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Alta: {'R$' + formatToLocale((parseFloat(price["03. high"])).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Baixo: {'R$' + formatToLocale((parseFloat(price["04. low"])).toFixed(2))}</Text>
                </View>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço atual em comparação</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>{compare[0].symbol + ' - R$' + compare[0].price}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>{compare[1].symbol + ' - R$' + compare[1].price}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>{compare[2].symbol + ' - R$' + compare[2].price}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>{compare[3].symbol + ' - R$' + compare[3].price}</Text>
                </View>
            </View>

            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço Historico</Text>

                    <Text style={[styles.h2, {
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 5
                    }]}>6 Meses</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Abertura: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["quarterly"]["reportedEPS"]) / 100 + 1)).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Alta: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["annual"]["reportedEPS"]) / 100 + 1)).toFixed(2))} </Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Baixa: {'R$' + formatToLocale((parseFloat(historic[1][1]["1. open"])).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 5
                    }]}>1 Ano</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Abertura: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["quarterly"]["reportedEPS"]) / 100 + 1)).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Alta: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["annual"]["reportedEPS"]) / 100 + 1)).toFixed(2))} </Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Baixa: {'R$' + formatToLocale((parseFloat(historic[1][1]["1. open"])).toFixed(2))}</Text>
                </View>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Projeção de ganhos</Text>

                    <Text style={[styles.h2, {
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 5
                    }]}>Ganhos</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Trimestrais: {parseFloat(gains["quarterly"]["reportedEPS"])}%</Text>


                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Semestrais: {parseFloat(gains["quarterly"]["reportedEPS"]) * 2}%</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Anuais: {parseFloat(gains["annual"]["reportedEPS"])}% </Text>

                    <Text style={[styles.h2, {
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 5
                    }]}>Projeções</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Trimestrais: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["quarterly"]["reportedEPS"]) / 100 + 1)).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Semestrais: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["quarterly"]["reportedEPS"]) * 2 / 100 + 1)).toFixed(2))}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Anuais: {'R$' + formatToLocale((parseFloat(user.money) * (parseFloat(gains["annual"]["reportedEPS"]) / 100 + 1)).toFixed(2))} </Text>
                </View>

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
    card: {
        width: '48%',
        elevation: 5,
        padding: 10
    },
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    h2: {
        fontSize: 14
    },
})