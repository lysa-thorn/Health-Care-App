import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import MaterialDetail from './app/components/MaterialDetail';
import MaterialList from './app/components/MaterialList';
import CommentEdit from './app/components/CommentEdit';
import EditMaterial from './app/components/EditMaterail';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App()  {
  return (
    <NavigationContainer>
      <View style={styles.navBar}>
        <Image source={require('./app/images/main_logo.png')} style={{ width: 98, height: 22 }} />
        <View style={styles.rightNav}>
          <TouchableOpacity>
            <Icon style={styles.navItem} name="search" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Icon style={styles.navItem} name="account-circle" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <Stack.Navigator initialRouteName="MaterialList">
        <Stack.Screen name="MaterialList" 
          component={MaterialList} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MaterialDetail" 
          options={{ headerShown: false }}
          component={MaterialDetail} />
        <Stack.Screen 
          name="CommentEdit" 
          options={{ headerShown: false }}
          component={CommentEdit} />
          <Stack.Screen name="EditMaterial" component={EditMaterial}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 55,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row'
  },
  navItem: {
    marginLeft: 25
  },
  body: {
    flex: 1
  },
  tabBar: {
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 0.5,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 11,
    color: '#3c3c3c',
    paddingTop: 4
  }
})