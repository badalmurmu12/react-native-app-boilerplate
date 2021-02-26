import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import LoginScreen, {
  screenOptions as loginScreenOptions
} from '../screens/user/LoginScreen';
import SigninScreen, {
  screenOptions as signinScreenOptions
} from '../screens/user/SigninScreen';
import SignupScreen, {
  screenOptions as signupScreenOptions
} from '../screens/user/registration/SignupScreen';
import RegistrationScreen, {
  screenOptions as registrationScreenOptions
} from '../screens/user/registration/Registration';
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

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>


      <AuthStackNavigator.Screen
        name="Auth"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={signupScreenOptions}
        />
      <AuthStackNavigator.Screen
        name="Registration"
        component={RegistrationScreen}
        options={registrationScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="Signin"
        component={SigninScreen}
        options={signinScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
