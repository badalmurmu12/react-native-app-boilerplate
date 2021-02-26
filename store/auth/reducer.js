import { LOGIN_SUCCESS, LOGIN_CHECK, REGISTRATION_SUCCESS,LOGOUT_SUCCESS, GET_OTP_SUCCESS,GET_OTP_FAIL,PUSHNOTIFICATION_SUCCESS, LOGIN_SCREEN } from "./actions";

export const reducer = (state = { loggedIn: false,user:{}, tryAllLogin: true,loginScreen: false, pushNotification: true, registration: true }, action) => {

  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case LOGIN_CHECK:
      return { ...state, ...action.payload };

    case GET_OTP_SUCCESS:
      return {...state, ...action.payload};
    case GET_OTP_FAIL:
      return {...state, ...action.payload};
    case PUSHNOTIFICATION_SUCCESS:
        return {...state, ...action.payload};
    case LOGIN_SCREEN:
        return {...state, ...action.payload};
    case REGISTRATION_SUCCESS:
        return {...state, ...action.payload};
    default:
      return state;
  }
};
