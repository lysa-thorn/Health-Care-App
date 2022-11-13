import React, { useState } from "react";
import { Component } from "react";
import { Button, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../const/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import SelectList from 'react-native-dropdown-select-list'

const RegisterScreen = ({ navigation }) => {

  const [inputs, setInput] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    cfPassword: ''
  });

  const [error, setError] = useState({})
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: '1', value: 'Doctor' },
    { key: '2', value: 'Student' },
    { key: '3', value: 'Nurse' },
    { key: '4', value: 'Programmer'},
  ];
  
  const validate = () => {
    let valid = true;
    Keyboard.dismiss();
    const {fullname, phone, email, password, cfPassword} = inputs;
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
    } else if (password.length < 8) {
       handleError('Password must be more than 8', 'password');
    }

    if (cfPassword.match(password)) {
       handleError('Please input match password', 'cfPassword');
      valid = false;
    }

    // if (!email) {
    //   handleError('Please input email', 'email');
    //   valid = false;
    // } else if(!email.match(/S\=@\S+\.\S+/)) {
    //   handleError('Please input valid email', 'email')
    // } 

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

  const onSubmit = () => {}

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightGreen, flex: 1 }}> 
      {/* <Loader visible={loading} /> */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20
        }}
      >
        {/* <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text> */}
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
          <Text
            style={{
              marginVertical: 5,
              fontSize: 14,
              color: COLORS.black
            }}
          >Select Role</Text>
          <SelectList
            label="Select Role"
            setSelected={setSelected}
            data={data}
            boxStyles={{
              borderRadius: 5, height: 45, backgroundColor: COLORS.white
            }}
            dropdownStyles={{
              borderRadius: 5,
              backgroundColor: COLORS.white,
              marginTop: -2
            }}
            search={false}
            onSelect={() => alert(selected)}
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