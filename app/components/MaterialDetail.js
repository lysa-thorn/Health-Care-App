import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const MaterialDetail = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.btn}>
                <TouchableOpacity onPress={() => navigation.navigate("MaterialList")}>
                    <Icon name="home" size={30} color="#050505" />
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={styles.cardheader}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={styles.cardBody}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                    <Text style={styles.text}>{item.description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    card: {
        padding: 5
    },
    cardBody: {
        padding: 5
    },
    cardheader: {
        padding: 5
    },
    title: {
        color: '#000',
        fontSize: 24,
    },
    text: {
        color: '#000',
        fontSize: 15,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        padding: 10
    }
});

export default MaterialDetail;