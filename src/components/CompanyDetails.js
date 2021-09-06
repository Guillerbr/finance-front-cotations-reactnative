import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';

export default function CompanyDetails({ colors, data }) {
    return (
        <Animatable.View duration={1500} animation="fadeInUp" style={styles.container}>

            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>Preço Atual</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Abertura: {parseFloat(data["1. open"])}</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Fechamento: {parseFloat(data["4. close"])}</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Alta: {parseFloat(data["2. high"])}</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Baixo: {parseFloat(data["3. low"])}</Text>
                </View>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>Preço Historico</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Preço Atual</Text>
                </View>

            </View>


            <View style={styles.column}>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>Preço atual em comparação</Text>


                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Preço Atual</Text>
                </View>

                <View style={[styles.card, {
                    backgroundColor: colors.backgroundCards
                }]}>
                    <Text style={[styles.title, {
                        color: colors.text
                    }]}>Projeção de ganhos</Text>

                    <Text style={[styles.subTitle, {
                        color: colors.text
                    }]}>Preço Atual</Text>
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
        padding: '5%',
    },
    card: {
        width: '47%',
        elevation: 5,
        padding: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 14
    }
})