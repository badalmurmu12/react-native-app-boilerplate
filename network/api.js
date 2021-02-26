import { http_noauth, http } from "./request";
import * as EndPoint from "./endpoints";
import { getAccessToken, getRefreshToken } from "./authData";

const CLIENT_ID = "egQGOWCJeEUoIUo6tYroQGveZaRaXfI9Z7PkM19U";
const CLIENT_SECRET = "QD6nf2wF8viQWSyj9WfnmAnRC0Yx9CvBlxM9acB1vveUeBW40948IjGvWJLH0kZULRmupVLJ1ZckFLkoCcepo4Fkp5ZrxFxX5px7JfC4jDPSrQfJOalL9dyoCgwEsuK1";


const CLIENT_ID_1 = "6HZDML6egjW9kJqJm0pKDzIHcr0Odoz9SSJREB5O";
const CLIENT_SECRET_1 = "OwkuRVliklVQZ3Y6a5rKqJVtCfMIH8SBcVu3VKUDnj0GVOR2FPy033Pgazja3CiaZoTnf2FbUT9ljJkUp8eAz4cwQfWooABVtTQT4PUXLCVU5euoIiG6b8PVhhKxVkeh";


let refreshTokenPromise;

export const refreshToken = async () => {
  try {
    if (!refreshTokenPromise) {
      refreshTokenPromise = http_noauth.post(EndPoint.AUTH_TOKEN, {
        grant_type: "refresh_token",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: getRefreshToken(),
      });
    }
    const response = await refreshTokenPromise;
    refreshTokenPromise = null;
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
};

export const getToken = async (credentials) => {

  try {
    const response = await http_noauth.post(EndPoint.AUTH_TOKEN, {
      grant_type: "password",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      otp:"false",
      username: credentials.mobile,
      password: credentials.password,
    });

    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
};

export const signUp = async (credentials) => {
  try {
    const response = await http_noauth.post(EndPoint.SIGNUP,  credentials);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}
export const registration = async (credentials) => {
  try {
    const response = await http.post(EndPoint.REGISTRATION,  credentials);
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
}

export const getOtp = async (credentials) => {

  try {
    const response = await http_noauth.post(EndPoint.GET_OTP, {
      mobile: credentials.mobile,
    });
    return response;
  } catch (err) {
    if ("error_description" in err) throw err.error_description;
    throw err;
  }
};



export const revokeToken = async () => {
  return await http.post(EndPoint.REVOKE_TOKEN, {
    token: getAccessToken(),
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });
};

/**
 * Example APIs
 */
export const getUserData = async () => {
  try {
    const response = await http.get(EndPoint.USER_DATA);
    return response;
  } catch (err) {

    alert(err.error)
  }
};


export const updateProfile = async (profile) =>{
  try{
    const response =  await http.patch(EndPoint.USERS_DATA+profile.id+'/',profile)
    return response
  } catch (err){

    alert(err)
  }
}


export const sendnotifyToken = async (token) => {
  return await http_noauth.post(EndPoint.NOTIFY_TOKEN, token)
}


export const notify = async (booking) =>{
  return await http.post(EndPoint.NOTIFY, booking)
}
