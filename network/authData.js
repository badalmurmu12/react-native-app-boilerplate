import  AsyncStorage  from '@react-native-community/async-storage';
let _tokenResponse = null;
let _isLoggedIn = false;
let _userData = null;
let _pushNotification = true;

const loadFromStorage = () => {
  if (_isLoggedIn) return;

  try {
    _tokenResponse = JSON.parse(AsyncStorage.getItem("tokenResponse"));
    _userData = JSON.parse(AsyncStorage.getItem("userData"));
    _pushNotification = JSON.parse(AsyncStorage.getItem("pushtokenResponse"));
    if (_tokenResponse) {
      _isLoggedIn = true;
    }
  } catch (err) {}
};

export const clearAll = () => {
  AsyncStorage.removeItem("tokenResponse");
  AsyncStorage.removeItem("pushtokenResponse");
  AsyncStorage.removeItem("userData");
  _tokenResponse = null;
  _isLoggedIn = false;
  _userData = null;
};

export const setTokenResponse = (tokenResponse) => {
 
  _tokenResponse = tokenResponse;
  _isLoggedIn = true;
  AsyncStorage.setItem("tokenResponse", JSON.stringify(tokenResponse));
};

export const setPushTokenResponse = (tokenResponse) => {
  AsyncStorage.setItem("pushtokenResponse",  false);
}

export const setUserData = (userData) => {
  _userData = userData;
  AsyncStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserData = () => {
  loadFromStorage();
  return _userData;
};

export const getLoggedIn = () => _isLoggedIn;
export const getPushNotification = () => _pushNotification;

export const hasPermission = (permission) => {
  return _userData.groups.find((group) => {
    return group.permissions.includes(permission);
  });
};

export const getAccessToken = () => _tokenResponse.access_token;
export const getRefreshToken = () => _tokenResponse.refresh_token;
