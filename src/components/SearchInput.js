import React from 'react'
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchInput({ colors, placeholder, value, change, onPress }) {
    return (
        <Animatable.View duration={2000} animation="fadeInRightBig" style={[styles.container, {
            backgroundColor: colors.backgroundSearch,
            borderColor: colors.borderSearch,
            elevation: 4
        }]}>
            <TextInput
                value={value}
                onSubmitEditing={onPress}
                onChangeText={(text) => change(text)}
                placeholder={placeholder}
                placeholderTextColor={colors.placeholder}
                style={[styles.searchBar, {
                    backgroundColor: 'transparent',
                    color: colors.text,
                }]}
            />
            <TouchableOpacity
                onPress={onPress}
                style={styles.icon}>
                <LinearGradient
                    colors={[colors.primary, colors.secundary]}
                    start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0 }}
                    style={styles.icon}>
                    <EvilIcons
                        name="search"
                        size={30}
                        color={colors.textHeader} />
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        paddingTop: 4,
        paddingBottom: 2,
        margin: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
    },
    icon: {
        borderRadius: 30,
        position: 'absolute',
        right: 5,
        height: 40,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        fontSize: 16,
        flex: 0.8
    },
})