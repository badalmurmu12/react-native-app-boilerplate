import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/auth';
import { Avatar, DataTable } from 'react-native-paper';

const Profile = props =>{
    const [chatText , setChattext ] = useState('');
    const dispatch = useDispatch();
    const userdata =   useSelector(state => state.auth.userData)
    const feedbacks =   useSelector(state => !state.auth.userData.BasicInfo)
    console.log(feedbacks);
    console.log(userdata);
    useEffect(() => {
     if(!feedbacks){
        dispatch(authActions.fetchUser())
        }
      }, [dispatch]);
    const saveFeedback = async() =>{

      await dispatch(feedbackActions.postFeedback({feedback: chatText}))
    }

     return(
      <View Style={styles.container}>
        <ScrollView contentContainerStyle={styles.containersc}>
          <Avatar.Icon size={96} icon="account" />

        </ScrollView>
      </View>
      )
  }

  export const screenOptions = () => {
    const dispatch = useDispatch();
    const userdata = useSelector(state => state );
    return {
      headerTitle: 'Profile',
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
  containersc:{
    alignItems:'center',
      paddingTop: 20,
      paddingBottom:30,
      paddingHorizontal:10
  },
  container:{
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems:'center',
    padding: 10
  },
  containers:{
    margin: 5
  },
  containerc:{

  },
  buttombtn:{
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,

  }
});




export default Profile;
