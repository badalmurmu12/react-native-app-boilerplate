import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import {connect} from 'react-redux';
import * as authActions from '../../../store/auth';

class Registration extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      alternative_mobile: '8130693923',
      name: '',
      father_name: '',
      village: '',
      gram_panchayat: '',
      block: '',
      pincode:'',
      farmer_id:'',
      dist:''
    }
    this.authHandler = this.authHandler.bind(this);
  }

    authHandler = async () => {
        let action;
        action = authActions.registration(
            {name : this.state.name,
            father_name : this.state.father_name,
            alternative_mobile : this.state.alternative_mobile,
            village : this.state.village,
            gram_panchayat : this.state.gram_panchayat,
            block : this.state.block,
            pincode : this.state.pincode,
            farmer_id : this.state.farmer_id,
            dist : this.state.dist,
          }
          );

      try {
        await this.props.dispatch(action);


        // props.navigation.navigate('Shop');
      } catch (err) {

        console.log(err.message);

      }
    };
  render(){
   
    return(<SafeAreaView>
      <ScrollView style={styles.cardcontainer}>
      <Card >
      <View style={styles.cardcontainers}>
      <TextInput
      style={styles.cardcontainers}
        label="Name"
        value={this.state.name}
        onChangeText={(name) => this.setState({name})}
        />


      <TextInput
      style={styles.cardcontainers}
          label="Father name"
          value={this.state.father_name}
          onChangeText={(father_name) => this.setState({father_name})}
        />

      <TextInput
      style={styles.cardcontainers}
        label="Mobile"
        value={this.state.mobileno}

        onChangeText={(alternative_mobile) => this.setState({alternative_mobile})}
        />

      <TextInput
      style={styles.cardcontainers}
        label="Village"
        value={this.state.village}
        onChangeText={(village) => this.setState({village})}
        />
      <TextInput
      style={styles.cardcontainers}
        label="Gram panchayat"
        value={this.state.gram_panchayat}
        onChangeText={(gram_panchayat) => this.setState({gram_panchayat})}
        />
        <TextInput
        style={styles.cardcontainers}
          label="Block"
          value={this.state.block}
          onChangeText={(block) => this.setState({block})}
          />
      <TextInput
      style={styles.cardcontainers}
            label="Dist"
            value={this.state.dist}
            onChangeText={(dist) => this.setState({dist})}
            />
      <TextInput
      style={styles.cardcontainers}
            label="Pincode"
            value={this.state.pincode}
            onChangeText={(pincode) => this.setState({pincode})}
            />
      <TextInput
      style={styles.cardcontainers}
          label="Farmer ID"
          value={this.state.farmer_id}
          onChangeText={(farmer_id) => this.setState({farmer_id})}
          />
      <Button  style={styles.cardcontainers} mode="contained" onPress={this.authHandler}>
          Submit
      </Button>
      </View>
      </Card >
      </ScrollView >
    </SafeAreaView>)
  }
}

export const screenOptions = {
  headerTitle:'Basic Information'
};

const styles = StyleSheet.create({
  cardcontainer:{
    padding: 20
  },
  cardcontainers:{
    margin: 5,
    marginBottom: 20
  }
});
const mapStateToProps = (state) =>{
  console.log(state);
  return {

  }
}

export default connect(mapStateToProps )(Registration);
