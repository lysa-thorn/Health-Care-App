import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import AddMaterial from './app/components/AddMaterial';
import Profile from './app/components/Profile';
// import editProfile from './app/components/editProfile';

const Stack = createNativeStackNavigator();

function HeaderTitle({ navigation }) {
  return (
    <View style={styles.navBar}>
      <Image source={require('./app/images/main_logo.png')}
        style={{ width: 100, height: 22 }} />
      <View style={styles.rightNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon style={styles.navItem} name="account-circle" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="MaterialList"
          component={MaterialList}
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
        />
        <Stack.Screen name="Profile"
          component={Profile}
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
        />
        <Stack.Screen
          name="MaterialDetail"
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
          component={MaterialDetail} />
        <Stack.Screen
          name="CommentEdit"
          options={{ headerShown: false }}
          component={CommentEdit} />

        <Stack.Screen
          name="AddMaterial"
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
          component={AddMaterial} />
        <Stack.Screen
          name="EditMaterial"
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
          component={EditMaterial} />
        {/* <Stack.Screen
          name="editProfile"
          options={({ navigation }) => {
            return {
              headerTitle: () => <HeaderTitle navigation={navigation} />,
            };
          }}
          component={editProfile} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 55,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width:300
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

export default App;