import React from "react"
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import COLORS from "../const/colors"

const CustomButton = ({ title, backgroundColor, onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[{ marginTop: 10, backgroundColor: backgroundColor }, styles.button]}>
                <Text style={{ color: COLORS.white }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backfaceVisibility: "hidden",
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        padding: 12,
        marginTop: 20
    }
})

export default CustomButton;