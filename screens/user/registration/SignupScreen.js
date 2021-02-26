import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,

} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import {connect} from 'react-redux';
import * as authActions from '../../../store/auth';

class Signup extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      mobileno: '',
      password: '',
      confrm_password: ''
    }
    this.authHandler = this.authHandler.bind(this);
  }

  authHandler = async () => {
    if( this.state.mobileno.length ===10 && this.state.mobileno.match(/^[0-9]+$/) && this.state.password.length > 6)
    {
      let action;

      action = authActions.signup(
          {mobile : this.state.mobileno,
          password : this.state.password}
        );



    try {
      await this.props.dispatch(action);


      // props.navigation.navigate('Shop');
    } catch (err) {

      console.log(err.message);
    }
    }
  else
    {
      alert("Mobile Number must be 10 digit and password should contain at least 8 characters");
      return false;
    }

  };
  render(){
    return(<SafeAreaView>
      <ScrollView style={styles.cardcontainer}>
      <Card >
      <View style={styles.cardcontainers}>
      <TextInput
      style={styles.cardcontainers}
        label="Mobile"
        value={this.state.mobileno}
        onChangeText={(mobileno) => this.setState({mobileno})}
        />

      <TextInput
        style={styles.cardcontainers}
        label="Password"
        value={this.state.password}
        onChangeText={(password) => this.setState({password})}
        />
      <TextInput
        style={styles.cardcontainers}
        label="Confirm Password"
        value={this.state.confrm_password}
        onChangeText={(confrm_password) => this.setState({confrm_password})}
        />
      <Button style={styles.cardcontainers} mode="contained" onPress={this.authHandler}>
          Submit
      </Button>
      </View>
      </Card >
      </ScrollView >
    </SafeAreaView>)
  }
}

export const screenOptions = {
  headerTitle:'Registration'
};

const styles = StyleSheet.create({

  cardcontainer:{
    padding: 20
  },
  cardcontainers:{
    margin: 5
  }
});

const mapStateToProps = (state) =>{
  console.log(state);
  return {

  }
}

export default connect(mapStateToProps )(Signup);
