import axios from "axios";
import React, { useState } from "react";
import { Component } from "react";
import { Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import COLORS from "../const/colors";

const LoginScreen = ({ navigation }) => {

  const [inputs, setInput] = useState({
    phone: '',
    password: ''
  });

  const [error, setError] = useState({})
  const [loading, setLoading] = useState(true)

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    const {phone, password} = inputs;
    
    if (!password) {
       handleError('Please input password', 'password');
      valid = false;
    }
    // else if (password.length < 8) {
    //    handleError('Password must be more than 8', 'password');
    // }

    if (!phone) {
      handleError('Please input phone', 'phone');
      valid = false;
    } 

    if (valid) {
      onSubmit().catch(console.log);
    }
    
  };

  const handleChangeInput = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  }

  const handleError = (errorMessage, input) => {
    setError((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  const onSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
        const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "phone": inputs.phone, "password": inputs.password })
      });
     
      if (res) {
        const resData = await res.json();
        if (resData.phone == inputs.phone && inputs.password) {
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error:', 'Incorrect phone number or password!');
        }
      } else {
        Alert.alert('Error:', 'User does not exist');
      }
    })
    
  }

  return (
    <SafeAreaView style={{backgroundColor: COLORS.lightGreen, flex: 1}}> 
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20
        }}
      >
        {/* <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text> */}
        <Text style={{ color: COLORS.black, fontSize: 25, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <CustomInput
            iconName="phone"
            label="Phone Number"
            onChangeText={(text) => handleChangeInput(text, 'phone')}
            error={error.phone}
            onFous={() => {
              handleError(null, 'phone');
            }}
          />
          <CustomInput
            iconName="lock-outline"
            label="Password"
            password
            onChangeText={(text) => handleChangeInput(text, 'password')}
            error={error.password}
            onFous={() => {
              handleError(null, 'password');
            }}
          />
          <CustomButton title="Login" backgroundColor="#13aa52" onPress={validate} />
          <Text
            onPress={() => navigation.navigate('Register')}
              style={{
                color: COLORS.black,
                textAlign: 'center',
                fontSize: 16,
                marginTop: 10
              }}
            >
             Create new account? Register
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen;