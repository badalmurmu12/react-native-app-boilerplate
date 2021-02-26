import * as API from "../../network/api";

import {
  setUserData,
  setTokenResponse,
  getUserData as getLocalUserData,
  getLoggedIn,
  clearAll,
  setPushTokenResponse,
  getPushNotification,
} from "../../network/authData";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const GET_OTP_SUCCESS = "GET_OTP_SUCCESS";
export const LOGIN_CHECK = "LOGIN_CHECK";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const GET_OTP_FAIL = "GET_OTP_FAIL";
export const PUSHNOTIFICATION_SUCCESS = "PUSHNOTIFICATION_SUCCESS";
export const LOGIN_SCREEN = "LOGIN_SCREEN";

const loginSuccess = (userData) =>{
  console.log('loginuserdata',userData);
  if(userData && userData.BasicInfo){
  return ({
  type: LOGIN_SUCCESS,
  payload: { userData, loggedIn: true,loginScreen: false, registration:false },
})
}
  else{
    return ({
    type: LOGIN_SUCCESS,
    payload: { userData, loggedIn: true,loginScreen: false, registration:true },
  })
  }
;}

const registrationsucc = (userData) => ({
  type: REGISTRATION_SUCCESS,
  payload: {userData,registration: false },
})
const SignupSuccess = (userData) => ({
  type:Signup_Success,
  payload: {userData, loggedIn: true,registration: false, loginScreen: false}
})
const getotpSuccess = (ubasicData) => ({
  type: GET_OTP_SUCCESS,
  payload: { ubasicData, otp: true },
});

const getotpFail = (err) => ({
  type: GET_OTP_FAIL,
  payload: { err, otp: false },
});

const loginCheck = (userData, loggedIn, pushNotification) =>{
  console.log('userdata',userData );
 return ({
  type: LOGIN_CHECK,
  payload: { userData, loggedIn,pushNotification,tryAllLogin:  true},
});
}
const pushNotificationSucc = () => ({
  type: PUSHNOTIFICATION_SUCCESS,
  payload: {pushNotification: false}
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,

});

export const loginScreenDisplay = () => ({
  type: LOGIN_SCREEN,
  payload:{loginScreen: true}
})

export const loginScreenHidec = () =>({
  type: LOGIN_SCREEN,
  payload:{loginScreen: false}
})

export const logout = () => async (dispatch, getState) => {
  try {
    await API.revokeToken();
    clearAll();
    dispatch(logoutSuccess());
  } catch (err) {}
};

export const loginScreen = () => async (dispatch, getState) => {
  return dispatch(loginScreenDisplay())
}

export const loginScreenHide = () => async (dispatch, getState) => {
  return dispatch(loginScreenHidec())
}


export const checkAuth = () => async (dispatch, getState) => {

  dispatch(loginCheck(getLocalUserData(), getLoggedIn(),getPushNotification()));
};

export const fetchUser = (data) => async (dispatch, getState) => {

  try {
    const userData = await API.getUserData();

    setUserData(userData);
    dispatch(loginSuccess(userData));
  } catch (err) {
    console.log(err);
  }
};


const fetchUsersignup = (data) => async (dispatch, getState) => {

  try {
    const userData = await API.getUserData();

    setUserData(userData);
    dispatch(SignupSuccess(userData));
  } catch (err) {
    console.log(err);
  }
};
export const attemptLogin = (credentials) => async (dispatch, getState) => {

  try {
    const data = await API.getToken(credentials);

    await setTokenResponse(data);
    dispatch(fetchUser(data));

  } catch (err) {
    console.log(err);
     alert(err);

  }
};

export const requestOtp = (credentials) => async (dispatch, getState) => {

  try {
    const requestotp = await API.getOtp(credentials);

    dispatch(getotpSuccess(requestotp));

  } catch (err) {
     alert('Send otp failed');
     dispatch(getotpFail(err));
  }
};

export const saveProfile = (profile) => async(dispatch, getState) =>{

  try{
    const profiles = await API.updateProfile(profile);
      dispatch(fetchUser());

  } catch(err){

  }
}

export const sendToken = (token) => async(dispatch, getState) =>{

  try{
    const sendtoken = await API.sendnotifyToken(token);
    setPushTokenResponse(sendToken);
    dispatch(pushNotificationSucc())
  } catch(err){
    console.log(err);

  }
}

export const signup = (credentials) => async(dispatch, getState) =>{
  try {

    const data = await API.signUp(credentials);

    dispatch(attemptLogin(credentials));
  } catch (err) {
    console.log('signup',err);
    alert('sign up fail')

  }
}

export const registration = (credentials) => async(dispatch, getState) =>{
  try {

    const data = await API.registration(credentials);
    alert('Registration Success')
    dispatch(registrationsucc(data));
  } catch (err) {
    console.log(err);
    alert('Registration fail')

  }
}

export const saveAddress = (address) => async(dispatch, getState) =>{
  try {
    const data = await API.saveAddress(address);
      dispatch(fetchUser(data));
  } catch (err) {
    console.log(err);
     alert(err);
  }
}

export const deleteAddress = (address) => async(dispatch, getState) =>{
  try {
    const data = await API.deleteAddress(address);
      dispatch(fetchUser(data));
  } catch (err) {
    console.log(err);
     alert(err);
  }
}
