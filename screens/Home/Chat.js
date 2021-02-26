import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import * as feedbackActions from '../../store/booking';

const Chat = props =>{
    const [chatText , setChattext ] = useState('');
  const dispatch = useDispatch();
    const feedback =   useSelector(state => state.booking.feedback)
    const feedbacks =   useSelector(state => !state.booking.feedback)

   useEffect(() => {
     if(!feedbacks){
        dispatch(feedbackActions.fetchFeedback())
        }
      }, [dispatch]);
    const saveFeedback = async() =>{

      await dispatch(feedbackActions.postFeedback({feedback: chatText}))
    }

     return(
      <View style={styles.container}>
      <ScrollView >
      {feedback.length >0 ?
        feedback.map((feed, index) => {
          return(        <View key={index} style={feed.reply ? styles.chatreply : styles.chat}>
                    <Text style={styles.chatt}> {feed.feedback} </Text>
                  </View>)
        })
 :
        <View>
          <Text> Welcome </Text>
        </View>
      }

      </ScrollView>
      <View style ={styles.buttombtn}>
      <TextInput style={styles.btninput}
      onChangeText={chatText => setChattext(chatText)}
      value={chatText}
      />
      <Button style={styles.btnbtn} mode="contained" onPress={saveFeedback}>Send</Button>
      </View>
      </View>
      )
  }



const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: 'aliceblue',
    padding: 10
  },
  containers:{
    margin: 5
  },
  containerc:{

  },
  buttombtn:{

    justifyContent: 'flex-end',
    marginBottom: 6,
    marginTop:10,
    flexDirection: 'row',


  },
  btninput:{
    flex:8,
    justifyContent: 'center',
    margin:5
  },
  btnbtn:{
    flex:0.5,
    justifyContent: 'center',
    margin:5
  },
  chat:{
    backgroundColor: 'orange',
    padding:5,
    borderRadius:10,
    margin:2,
    flex:1
  },
  chatreply:{
    backgroundColor: 'grey',
    padding:5,
    borderRadius:10,
    flex:1,
    margin:2,
  },
  chatt:{

  }
});




export default Chat;
