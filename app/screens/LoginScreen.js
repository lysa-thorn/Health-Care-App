import React, { useState } from "react";
import { Alert, Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import url from '../const/url.json'
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loader from "../components/Loader";
import COLORS from "../const/colors";

const LoginScreen = ({ navigation }) => {

  const [inputs, setInput] = useState({
    phone: '',
    password: ''
  });

  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    const {phone, password} = inputs;
    
    if (!password) {
       handleError('Please input password', 'password');
      valid = false;
    }
    else if (password.length < 5) {
       handleError('Password must be more than 5', 'password');
    }

    if (!phone) {
      handleError('Please input phone', 'phone');
      valid = false;
    } 

    if (valid) {
      onSubmit();
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
      const res = await fetch(
       url.base_url + '/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phone": inputs.phone,
          "password": inputs.password
        })
      });


      if (res) {

      let  userData = await res.json();
        if (userData.phone == inputs.phone && inputs.password) {
          navigation.navigate('MaterialList');
          AsyncStorage.setItem(
            'userData',
            JSON.stringify({...userData, loggedIn: true}),
          );
        } else {
          Alert.alert('Error:', 'Incorrect phone number or password!');
        }
      }
    }, 3000)
    
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightGreen, flex: 1 }}> 
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20
        }}
      >
        <Text style={{ color: COLORS.black, fontSize: 25, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{marginVertical: 20}}>
          <CustomInput
            iconName="phone"
            label="Phone Number"
            placeholder="Enter your phone number"
            onChangeText={(text) => handleChangeInput(text, 'phone')}
            error={error.phone}
            onFous={() => {
              handleError(null, 'phone');
            }}
          />
          <CustomInput
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            password
            onChangeText={(text) => handleChangeInput(text, 'password')}
            error={error.password}
            onFous={() => {
              handleError(null, 'password');
            }}
          />
          <CustomButton title="Login" backgroundColor={COLORS.green} onPress={validate} />
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