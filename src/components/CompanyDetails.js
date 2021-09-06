import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';

export default function CompanyDetails({ user, colors, price, gains }) {

    return (
        <Animatable.View duration={1500} animation="fadeInUpBig" style={styles.container}>
            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço Atual</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Preço: {(parseFloat(price["05. price"])).toFixed(2)}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Abertura: {(parseFloat(price["02. open"])).toFixed(2)}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Alta: {(parseFloat(price["03. high"])).toFixed(2)}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Baixo: {(parseFloat(price["04. low"])).toFixed(2)}</Text>
                </View>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço Historico</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Preço Atual</Text>
                </View>

            </View>

            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.h1, {
                        color: colors.text
                    }]}>Preço atual em comparação</Text>


                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Preço Atual</Text>
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
                    }]}>Anuais: {parseFloat(gains["annual"]["reportedEPS"])}% </Text>

                    <Text style={[styles.h2, {
                        color: colors.text,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 5
                    }]}>Projeções</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Trimestrais: {'R$' + (parseFloat(user.money) * (parseFloat(gains["quarterly"]["reportedEPS"]) / 100 + 1)).toFixed(2)}</Text>

                    <Text style={[styles.h2, {
                        color: colors.text
                    }]}>Anuais: {'R$' + (parseFloat(user.money) * (parseFloat(gains["annual"]["reportedEPS"]) / 100 + 1)).toFixed(2)} </Text>

                </View>

            </View>

        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingTop: '1%',
        paddingBottom: '4%'
    },
    card: {
        width: '47%',
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