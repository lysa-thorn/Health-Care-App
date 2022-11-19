import React, { useState, useEffect, Component } from 'react'
import {TextInput, Alert, Image, View, Text } from 'react-native'
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import COLORS from "../const/colors";
import * as ImagePicker from "react-native-image-picker"
import url from '../const/url.json';


const AddMaterial = ({navigation }) => {

       
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
        ImagePicker.launchImageLibrary(options, (response)  => {
        
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

    const uploadImage = () => {

        var myHeaders = new Headers();
        myHeaders.append(
            'Authorization',
            'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
        );

        myHeaders.append('Content-Type', 'application/json');

        var paramBody = {}
        response.assets.map((data) => {
            paramBody = {
                name: title,
                image: data.base64,
                description: description,
                user_id: 1
            }
        })

        fetch(url.base_url + '/api/materials', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(paramBody),
        })
        .then((response) => {
            response.text();
            console.log(response)
            // navigation.push('MaterialList')
        })
        .then((result) => console.log(result))
        .catch((error) => console.log(error));
    };

    return ( 
        <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 16}}>
              { !response?.assets && (
               <CustomButton title="Add an image" backgroundColor={COLORS.green} onPress={() => launchImage()}  />
            )}
           
            { response?.assets && response?.assets.map((data) => (
                <View key={data.uri} style={{marginVertical: 24, alignItems: 'center'}}>
                    <Image
                        resizeMode="cover"
                        resizeMethod="scale"
                        style={{ width: "100%", height: 150, borderRadius: 20 }}
                        source={{uri: data.uri}}
                    />
                </View>
            ))} 

          <Text style={{
            color: "#000", 
            fontSize: 16,
            fontWeight: '500', 
            marginBottom: 10,}}>Material Details</Text>

            <TextInput
                placeholder="Enter text here"
                multiline={true}
                numberOfLines={5}
                onChangeText={(value) => inputTitle(value)}
                style={{
                color: 'black',
                alignItems: 'center',
                height: 40,
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 5,
                textAlignVertical:'top'}}/>

            <TextInput
                multiline={true}
                numberOfLines={5}
                placeholder="Enter description"
                onChangeText={(value) => inputDescription(value)}
                style={{
                    color: 'black',
                    alignItems: 'center',
                    height: 70,
                    width: '100%',
                    marginTop: 20,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    textAlignVertical:'top'}}/>

            { response?.assets && (
                <CustomButton title="Post Material" backgroundColor={COLORS.green} onPress={() => uploadImage()} />
            )}
        </View>
    )
}

export default AddMaterial;