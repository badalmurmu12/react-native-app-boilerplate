import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartupScreen';
import AuthNavigator from './AuthNavigator';
import BottomNavigator from './HomeNavigator';


const AppNavigator = props =>{
  const isLogedin = useSelector(state => !!state.auth.loggedIn);
  const didTryAutoLogin = useSelector(state => state.auth.tryAllLogin);
  const didTryLogin = useSelector(state => state.auth.loginScreen);
 
  return(
    <NavigationContainer>
      {!isLogedin && didTryAutoLogin && !didTryLogin && <AuthNavigator />}
      {isLogedin && didTryAutoLogin && !didTryLogin && <BottomNavigator />}
      {!isLogedin && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  )
}

export default AppNavigator;
