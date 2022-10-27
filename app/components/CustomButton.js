import React from "react"
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import COLORS from "../const/colors"

const CustomButton = ({title, backgroundColor, onPress = () => {}}) => {
    return (
        <View style={[{marginTop: 10 , backgroundColor: backgroundColor}, styles.button]}>
            <TouchableOpacity onPress={onPress}activeOpacity={0.7}>
                <Text style={{color: COLORS.white}}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backfaceVisibility: "hidden",
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        padding: 12
    }
})

export default CustomButton;