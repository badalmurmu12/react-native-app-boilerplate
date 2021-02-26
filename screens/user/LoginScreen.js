import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button} from 'react-native-paper';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/auth';

const LoginScreen = props => {
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();
const [isSignup, setIsSignup] = useState(false);
const [isOtpget, setOtpget] = useState(false);
const dispatch = useDispatch();
const [mobile, setMobile] = useState('');
const [password, setPassword] = useState('');
const [otp, setOtp] = useState(' ');

const otpu = useSelector(state => !!state.auth.otp);
const otpv = useSelector(state => state.auth.otp);



useEffect(() => {
  if (otpv) {
      setOtpget(true);
  }
  else {
    setOtpget(false);
  }
}, [otpv]);

const authHandler = async () => {
  if( mobile.length ===10 && mobile.match(/^[0-9]+$/) )
  {
    let action;

    action = authActions.attemptLogin(
        {mobile : mobile,
        password : password}
      );


  setError(null);
  setIsLoading(true);
  try {
    await dispatch(action);
    setIsLoading(false);

    // props.navigation.navigate('Shop');
  } catch (err) {

    setError(err.message);
    setIsLoading(false);
    setOtpget(false);
  }
  }
else
  {
    alert("Mobile Number must be 10 digit");
    return false;
  }

};

const inputChangeHandler =  (mobile) => {
  setMobile(mobile)
}



  return(
    <KeyboardAvoidingView
      style={styles.screen}
      >

        <Card style={styles.authContainer}>
          <ScrollView>

              <View style={styles.formControl1}>
                <Text>Mobile </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={mobile => inputChangeHandler(mobile)}
                  defaultValue={mobile}
                  required
                  label="Mobile"
                  keyboardType="number-pad"
                  />
              </View>
              <View style={styles.formControl}>
                <Text>Password </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={password => setPassword(password)}
                  defaultValue={password}
                  required
                  label="Password"
                  secureTextEntry={true}


                  />
              </View>

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                    title='Login   ଲୋଗିନ'
                    onPress={authHandler}
                    mode="contained"

                    buttonStyle={{
                          backgroundColor: Colors.primary
                      }}
                      containerStyle={{

                         paddingBottom:20,
                         width: "40%"
                      }}
                     > Login   ଲଗଇନ୍ </Button>

              )}

              <View style={styles.buttonContainer}>
              <Button
                  title='Registration ପଞ୍ଜିକରଣ'
                  onPress={() => {  props.navigation.navigate('Signup');

                  }}
                  mode="contained"
                  buttonStyle={{
                        backgroundColor: Colors.primary
                    }}
                    containerStyle={{
                      paddingTop:20,                       paddingBottom:20,
                       width: "40%"
                    }}
                   > Registration ପଞ୍ଜିକରଣ</Button>

                   </View>





            </View>

          </ScrollView>
        </Card>

      </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle:'Home'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    padding: 20,


  },
  gradient:{
  flex:1,
  justifyContent: "center",
},
  buttonContainer: {
    marginTop: 10,
    alignItems:'center'
  },
  label: {    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  },
  formControl1:{
    paddingTop:40
  },
  formControl:{
    paddingBottom:30
  }
});

export default LoginScreen;
