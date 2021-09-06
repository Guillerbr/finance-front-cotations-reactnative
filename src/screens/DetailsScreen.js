import React from 'react'
import { View, FlatList, Text } from 'react-native'
import TextDetails from '../components/TextDetails';
import { formatToLocale } from '../utils/Functions';

export default function DetailsScreen({ route }) {
    const detailsProps = route.params

    return (
        <View style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: detailsProps.colors.background || '#FFF'
        }}>
            <View
                style={{
                    height: 22
                }}
            />
            {detailsProps.id == 'currentPrice' ?
                <View>
                    <TextDetails colors={detailsProps.colors} text={detailsProps.company["01. symbol"]} />
                    <TextDetails colors={detailsProps.colors} text={'Preço: R$' + formatToLocale(detailsProps.company["05. price"])} />
                    <TextDetails colors={detailsProps.colors} text={'Abertura: R$' + formatToLocale(detailsProps.company["02. open"])} />
                    <TextDetails colors={detailsProps.colors} text={'Alto: R$' + formatToLocale(detailsProps.company["03. high"])} />
                    <TextDetails colors={detailsProps.colors} text={'Baixo: R$' + formatToLocale(detailsProps.company["04. low"])} />
                    <TextDetails colors={detailsProps.colors} text={'Atualizado em: R$' + formatToLocale(detailsProps.refresh["3. Last Refreshed"])} />
                </View>
                :
                detailsProps.id == 'historicPrice' ?
                    <FlatList
                        data={detailsProps}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={{
                            padding: 15,
                            paddingTop: 0,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>

                                </View>
                            )
                        }}
                    />
                    : null
            }
        </View>
    )
}
