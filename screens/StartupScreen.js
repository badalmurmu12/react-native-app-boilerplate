import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/auth';



const StartupScreen = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => !!state.auth.loggedIn);
  const istrylogin = useSelector(state => !!state.auth.tryAllLogin);
  const stst = useSelector(state => state);




  useEffect(() => {
    const tryLogin = async () => {

      if (!isAuth && !istrylogin) {
        // props.navigation.navigate('Auth');

        dispatch(authActions.checkAuth() );

        return;
      }

    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
