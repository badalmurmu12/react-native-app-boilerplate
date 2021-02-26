import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/auth';

const SignupScreen = props => {
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();
const [isSignup, setIsSignup] = useState(false);
const [isOtpget, setOtpget] = useState(false);
const dispatch = useDispatch();
const [mobile, setMobile] = useState('');
const [password, setPassword] = useState('');
const [repassword, setRepassword] = useState('');
const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [referalcode, setReferalcode] = useState('');



useEffect(() => {

}, []);

const signUpHandler = async () => {
  if( mobile.length ===10 && mobile.match(/^[0-9]+$/) && password.length > 6)
  {
    let action;
      action = authActions.signup(
        { mobile : mobile,
          first_name: firstname,
        last_name: lastname,
        password:password,
        refer_code: referalcode}
      );
  setError(null);
  setIsLoading(true);
  try {
    await dispatch(action);
    setIsLoading(false);
    props.navigation.navigate('Auth');
    // props.navigation.navigate('Shop');
  } catch (err) {

    setError(err.message);
    setIsLoading(false);
    setOtpget(false);
  }

  }
else
  {
  alert("Number must be 10 digit and Password must not be blank, have atleast 6 character");
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

              <View style={styles.formControl}>
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
                  secureTextEntry={true}
                  required
                  label="Password"

                  />
              </View>
              <View style={styles.formControl}>
                <Text>Re Type Password </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={repassword => setRepassword(repassword)}
                  defaultValue={repassword}
                  secureTextEntry={true}
                  required
                  label="Password"

                  />
              </View>
              <View style={styles.formControl}>
                <Text>First Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={firstname => setFirstname(firstname)}
                  defaultValue={firstname}
                  required
                  label="Password"

                  />
              </View>
              <View style={styles.formControl}>
                <Text>Last Name </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={lastname => setLastname(lastname)}
                  defaultValue={lastname}
                  required
                  label="Password"

                  />
              </View>
              <View style={styles.formControl}>
                <Text>Referral Code </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={referalcode => setReferalcode(referalcode)}
                  defaultValue={referalcode}
                  required
                  label="Password"

                  />
              </View>







            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                    title='Signup'
                    onPress={signUpHandler}
                    buttonStyle={{
                          backgroundColor: Colors.primary
                      }}
                      containerStyle={{

                         paddingBottom:20,
                         width: "40%"
                      }}
                     />

              )}
            </View>

          </ScrollView>
        </Card>

      </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle:'Signup'
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
  }
});

export default SignupScreen;
