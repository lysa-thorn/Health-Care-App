import React, { useState } from "react";
import { Alert, Keyboard, SafeAreaView, ScrollView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";

const RegisterScreen = ({ navigation }) => {

  const [inputs, setInput] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    cfPassword: ''
  });

  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  
  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    const {fullname, phone, password, cfPassword} = inputs;
    if (!fullname) {
       handleError('Please input fullname', 'fullname');
      valid = false;
    }

    if (!phone) {
       handleError('Please input phone number', 'phone');
      valid = false;
    }

    if (!password) {
       handleError('Please input password', 'password');
      valid = false;
    } else if (password.length < 5) {
       handleError('Password must be more than 5', 'password');
    }

    if (cfPassword.match(password)) {
       handleError('Please input match password', 'cfPassword');
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

  const onSubmit = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const res = await fetch(
       url.base_url + '/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "fullname": inputs.fullname,
          "phone": inputs.phone,
          "password": inputs.password
        })
      });
     
      if (res) {
        const resData = await res.json();
        if (resData) {
          navigation.navigate('Login');
        } else {
          Alert.alert('Error:', 'You input invalid information. Please try again!');
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
        <Text style={{
          color: COLORS.black,
          fontSize: 25,
          marginVertical: 10,
        }}
        >
          Enter Your Details to Register
        </Text>
        <View style={{marginVertical: 20}}>
          <CustomInput
            iconName="person-outline"
            label="Full Name"
            placeholder="Enter your Full Name"
            onChangeText ={(text) => handleChangeInput(text, 'fullname')}
            error={error.fullname}
            onFous={() => {
              handleError(null, 'fullname');
            }}
          />
          <CustomInput
            keyboardType="numeric"
            iconName="phone"
            label="Phone Numer"
            placeholder="Enter your Phone Number"
            onChangeText={(text) => handleChangeInput(text, 'phone')}
            error={error.phone}
            onFous={() => {
              handleError(null, 'phone');
            }}
          />
          <CustomInput
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your Password"
            password
            onChangeText={(text) => handleChangeInput(text, 'password')}
            error={error.password}
            onFous={() => {
              handleError(null, 'password');
            }}
          />
          <CustomInput
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Enter your Confirm Password"
            password
          />
          <CustomButton title="Register" backgroundColor="#13aa52" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
              style={{
                color: COLORS.black,
                textAlign: 'center',
                fontSize: 16,
                marginTop: 10
              }}
            >
             Already have an account? Login
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen;