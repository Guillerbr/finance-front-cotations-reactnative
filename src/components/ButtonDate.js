import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { AntDesign, Fontisto } from '@expo/vector-icons';

export default function ButtonDate({ onPress, text, colors, icon }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={[styles.text, {
                color: colors.text
            }]}>{text || 'undefined'}</Text>
            {icon === 'date' ?
                <Fontisto name={'date'} size={20} color={colors.text} />
                :
                <AntDesign name={text === 'Confirmar' ? 'check' : 'close'} style={{
                    marginLeft: -5
                }} size={20} color={colors.text} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        marginRight: 8
    },
    button: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})