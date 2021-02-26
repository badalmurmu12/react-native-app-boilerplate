import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen, {
  screenOptions as loginScreenOptions
} from '../screens/user/LoginScreen';
import SigninScreen, {
  screenOptions as signinScreenOptions
} from '../screens/user/SigninScreen';
import SignupScreen, {
  screenOptions as signupScreenOptions
} from '../screens/user/registration/SignupScreen';
import HomeScreen, {
  screenOptions as homeScreenOptions
} from '../screens/Home/Home';

import ProfileScreen, {
  screenOptions as profileScreenOptions
} from '../screens/Home/Profile';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


export const screenOptions = {
  headerTitle: 'Authenticate'
};
const BottomTabNavigator = createBottomTabNavigator();

 const BottomNavigator = () =>{
  return(
    <BottomTabNavigator.Navigator initialRouteName="Home"
    initialRouteName="Home"
     activeColor="#f0edf6"
     inactiveColor="#fff"
     inactiveBackgroundColor='#694fad'
     backgroundColor="#f0edf6"
     tabStyle ={{backgroundColor: '#694fad'}}
     tabStyle={{ backgroundColor: '#694fad' }}

       tabBarOptions={{
         activeTintColor: '#f0edf6',
         inactiveTintColor: '#fff',
         style:{
         backgroundColor: '#694fad',
       },
         showLabel: true
       }}>

     <BottomTabNavigator.Screen
       name="Home"
       component={HomeNavigator}
       options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
       />
    <BottomTabNavigator.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
         tabBarLabel: 'Profile',
         tabBarIcon: ({ color, size }) => (
           <MaterialCommunityIcons name="account" color={color} size={size} />
         ),
       }}
      />

   </BottomTabNavigator.Navigator>
 );
};
const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen }
        options={homeScreenOptions}
      />

    </HomeStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProfileStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={profileScreenOptions}
      />

    </ProfileStackNavigator.Navigator>
  );
};
export default BottomNavigator;
