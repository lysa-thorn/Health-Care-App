import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Button } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditMaterial = ({ route, navigation }) => {
    const { item } = route.params;
    const [input, setInput] = useState({});
    const [getInfoImage, setImage] = useState({});
    const [pic, setPic] = useState("");

    useEffect(() => {
        setInput({
            name: item.name,
            description: item.description,
            image: item.image,
        });
    }, [])

    const onChangeName = (value) => {
        setInput({ ...input, name: value });
    };

    const onChangeDescription = (value) => {
        setInput({ ...input, description: value });
    };

    const openGallary = async () => {
        const options = {
            maxHeight: 200,
            maxWidth: 200,
            quality: 1,
            mediaType: "photo",
            includeBase64: true
        }
        const images = await launchImageLibrary(options);
        const file = {
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName
        }
        setImage(file);
        // setPic('data:image/png;base64,'+images.assets[0].base64)
    }

    const updateMaterail = async () => {
        const formdata = new FormData();
        formdata.append('name', input.name);
        formdata.append('description', input.description);
        formdata.append('user_id', item.user.id);
        formdata.append('image', getInfoImage)


        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3000/api/update-material/" + item.id, requestOptions)
            .then((response) => {
                response.text();
                navigation.push('MaterialList');
                console.log(response);
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('MaterialList')}>
                <Icon name="arrow-back" size={30} />
            </TouchableOpacity>
            <View style={{ margin: 30 }}>
                <Text style={{ textAlign: "center", fontSize: 20, color: '#000' }}>Update Material</Text>
            </View>
            <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={(value) => onChangeName(value)}
                value={input.name} />
            <TextInput
                placeholder="Description"
                style={styles.input}
                onChangeText={(value) => onChangeDescription(value)}
                value={input.description} />
            <Image style={styles.image} source={{ uri: input.image }} />

            <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                <TouchableOpacity onPress={openGallary}>
                    <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Open Gallary</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "center" }}>
                <TouchableOpacity onPress={updateMaterail}>
                    <View style={styles.btnUpdate}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: '#555'
    },

    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    image: {
        height: 100,
        width: 100,
        justifyContent: "center",
        margin: 20
    },
    btnUpdate: {
        backgroundColor: 'blue',
        padding: 10,
        width: 150,
        borderRadius: 10
    },
})

export default EditMaterial;