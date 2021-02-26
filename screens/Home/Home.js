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
import { connect, useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/auth';
import Registrati from '../user/registration/Registration';
import Colors from '../../constants/Colors';
 

class Home extends React.Component{
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

    static getDerivedStateFromProps(nextProps, prevState) {

   if (nextProps.registration !== prevState.registration) {

     return {

       registration: nextProps.registration
     };
   }

   return null;
 }
  render(){

    return(<SafeAreaView style={{flex:1}}>
              <View style={styles.cardcontainer}>
                <Text>Welcome </Text>

              </View >
            </SafeAreaView>)
  }
}
export const screenOptions = () => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state );
  return {
    headerTitle: 'Feedback',
    headerRight: () => (

               <Button
                title="Logout"
                mode='outlined'
                color="white"
                containerStyle={{paddingHorizontal:0.5, paddingVertical:0.5, marginRight:5}}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                buttonStyle={{backgroundColor: "white", color:"black", shadowColor: "#FFFFFF" }}
                titleStyle={{color:"white"}}

               onPress={()=>{  dispatch(authActions.logout());}}
              >Logout </Button>


    )
  };
};



const styles = StyleSheet.create({
  cardcontainer:{
    flex:1,
    flexDirection : 'column',
    padding: 10
  },
  cardcontainers:{
    margin: 5,

  }
});
const mapStateToProps = (state) =>{

  return {
    registration: state.auth.registration
  }
}

export default connect(mapStateToProps )(Home);
