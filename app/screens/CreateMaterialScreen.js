import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateMaterialScreen = ({navigation}) => {
  return (
    <View>
      <Text >
        This is create!
      </Text>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default CreateMaterialScreen;