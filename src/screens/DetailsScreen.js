import React from 'react';
import { View, FlatList } from 'react-native';

import TextDetails from '../components/TextDetails';
import { formatToLocale } from '../utils/Functions';
import { list } from '../utils/ListData';

export default function DetailsScreen({ route }) {

    const detailsProps = route.params

    const renderSeparator = () => (
        <View style={{
            backgroundColor: detailsProps.colors.primary,
            height: 2,
            marginVertical: 10
        }} />
    )

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
                <>
                    <TextDetails colors={detailsProps.colors} text={detailsProps.company["01. symbol"]} />
                    <TextDetails colors={detailsProps.colors} text={'Preço: R$' + formatToLocale(detailsProps.company["05. price"])} />
                    <TextDetails colors={detailsProps.colors} text={'Abertura: R$' + formatToLocale(detailsProps.company["02. open"])} />
                    <TextDetails colors={detailsProps.colors} text={'Alto: R$' + formatToLocale(detailsProps.company["03. high"])} />
                    <TextDetails colors={detailsProps.colors} text={'Baixo: R$' + formatToLocale(detailsProps.company["04. low"])} />
                    <TextDetails colors={detailsProps.colors} text={'Atualizado em: R$' + formatToLocale(detailsProps.refresh["3. Last Refreshed"])} />
                </>
                :
                detailsProps.id == 'historicPrice' ?
                    <FlatList
                        data={detailsProps.historic}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={{
                            padding: 15,
                            paddingTop: 0,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <TextDetails colors={detailsProps.colors} text={item.date} />
                                    <TextDetails colors={detailsProps.colors} text={'Abertura: R$' + formatToLocale(item.open)} />
                                    <TextDetails colors={detailsProps.colors} text={'Fechamento: R$' + formatToLocale(item.close)} />
                                    <TextDetails colors={detailsProps.colors} text={'Alto: R$' + formatToLocale(item.high)} />
                                    <TextDetails colors={detailsProps.colors} text={'Baixo: R$' + formatToLocale(item.low)} />
                                </View>
                            )
                        }}
                    />
                    :
                    detailsProps.id == 'gainsPrice' ?
                        <>

                        </>
                        :
                        <>
                            <View style={{
                                alignItems: 'center',
                                paddingBottom: 10,
                            }}>
                                <TextDetails colors={detailsProps.colors} text={'Atual:' + detailsProps.company["01. symbol"]} />
                                <TextDetails colors={detailsProps.colors} text={'Preço: R$' + formatToLocale(detailsProps.company["05. price"])} />
                            </View>


                            {list.map((item, index) => {
                                if (item.symbol.toLocaleLowerCase() !== detailsProps.company["01. symbol"].toLocaleLowerCase()) {
                                    return (
                                        <View key={index}>
                                            <TextDetails colors={detailsProps.colors} text={item.symbol} />
                                            <TextDetails colors={detailsProps.colors} text={'Preço: R$' + item.price} />
                                        </View>
                                    )
                                }
                            })}
                        </>
            }
        </View>
    )
}
