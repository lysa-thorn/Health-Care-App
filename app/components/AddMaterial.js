import React, { useState, useEffect, Component } from 'react'
import { TextInput, Alert, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CustomButton from "../components/CustomButton";
import COLORS from "../const/colors";
import * as ImagePicker from "react-native-image-picker"
import url from '../const/url.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddMaterial = ({ navigation }) => {
    const [images, setImages] = useState({});
    const [response, setResponse] = React.useState({});
    const [title, setTitle] = React.useState({});
    const [description, setDescription] = React.useState({});

    const inputTitle = (value) => {
        setTitle(value);
    };

    const inputDescription = (value) => {
        setDescription(value);
    };


    const launchImage = () => {
        let options = {
            maxHeight: 250,
            maxWidth: 350,
            mediaType: "photo",
            quality: 1,
            includeBase64: true,
            includeExtra: true
        }
        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else if (response.fileSize > 5242880) {
                Alert.alert("Oops! the photos are too big.", [{ text: "OK", onPress: () => console.log('ok Pressed') }],
                    { cancelable: false }
                )
            }
            else {

                setResponse(response)

            }
        })
    }

    const uploadImage = async () => {
        const userData = JSON.parse(await AsyncStorage.getItem("userData"));
        var paramBody = {}
        response.assets.map((data) => {
            var base64 = "data:image/png;base64," + data.base64
            paramBody = {
                name: title,
                image: base64,
                description: description,
                user_id: 1
            }
        })

        fetch(url.base_url + '/materials', {
            method: 'POST',
            body: JSON.stringify(paramBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.access_token,
            }
        })
            .then((response) => {
                response.text();
                if (response.status == 200) {
                    navigation.navigate('MaterialList');
                    navigation.push('MaterialList');
                } else {
                    Alert.alert('Error:', 'Require title and description');
                }
            })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('MaterialList')}>
                        <Icon name="arrow-back" size={30} />
                    </TouchableOpacity> */}
                    <Text style={{
                        color: "#000",
                        fontSize: 20,
                        marginTop: 12,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginBottom: 10,
                    }}>Create Materials</Text>
                </View>
                <View style={styles.cardBody}>
                    <TextInput
                        placeholder="title"
                        style={styles.input}
                        onChangeText={(value) => inputTitle(value)} />

                    <TextInput
                        placeholder="Description"
                        style={styles.input}
                        onChangeText={(value) => inputDescription(value)} />

                    {!response?.assets && (
                        <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                            <TouchableOpacity onPress={launchImage}>
                                <View style={{ backgroundColor: '#13aa52', padding: 10, borderRadius: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Open Gallary</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {response?.assets && response?.assets.map((data) => (
                        <View key={data.uri} style={{ marginVertical: 16, marginHorizontal: 10, alignItems: 'center' }}>
                            <Image
                                resizeMode="cover"
                                resizeMethod="scale"
                                style={{ width: "100%", height: 150, borderRadius: 20 }}
                                source={{ uri: data.uri }}
                            />
                        </View>
                    ))}

                    <View style={styles.btn}>
                        <CustomButton title="Post Material" backgroundColor={COLORS.green} onPress={() => uploadImage()} />
                    </View>

                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#555'
    },
    btn: {
        padding: 10
    },

    card: {

    },
    cardHeader:{
        padding:10
    },
    cardBody: {
        padding: 15,
    }

})

export default AddMaterial;