
import React, { Component, useEffect, useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
// import { styles } from "react-native-floating-label-input/src/styles";
import url from '../url.json';
const EditMaterial = ({ route, navigation }) => {

    const { item } = route.params;
    // console.log(item)
    const [input, setInput] = useState({});
    useEffect(() => {
        // console.log("====> onload");
        setInput({
            name: item.name,
            image: item.image,
            description: item.description,
        });
    }, [])

    const onChangeName = (value) => {
        // console.log("=======> new vlaue", { ...input, name: value })
        setInput({ ...input, name: value });
    };
    const onChangeImage = (value) => {
        setInput({ ...input, image: value });
    };
    const onChangeDescription = (value) => {
        setInput({ ...input, description: value });
    };

    const updateData = () => {

        var myHeaders = new Headers();

        myHeaders.append(
            'Authorization',
            'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
        );

        myHeaders.append('Content-Type', 'application/json');

        fetch(url.base_url + '/api/materials/' + item.id, {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify({
                name: input.name,
                image: input.image,
                description: input.description,
                user_id:item.user_id

                
            }),
        })
            .then((response) => {
                response.text();
                console.log(response)
                navigation.push('ListMaterial')
            })
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

        

    };




    return (
        <View>
            <TextInput
                placeholder="Materail Name" style={styles.input} onChangeText={(value) => onChangeName(value)} value={input.name} />
            {/* <TextInput
                placeholder="Image" onChangeText={(value) => onChangeImage(value)} value={input.image}
            /> */}
             {/* <Image source={{ uri: item.image }} style={{ height: 200 }} /> */}
             
            <TextInput
                placeholder="Description" onChangeText={(value) => onChangeDescription(value)} value={input.description}
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={updateData}>
                    <View style={{ backgroundColor: 'blue', padding: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditMaterial;

const styles = StyleSheet.create({
    input: {
      marginTop: 10,
      marginBottom: 10
      },
  })