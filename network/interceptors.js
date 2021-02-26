import { getAccessToken, setTokenResponse } from "./authData";
import { refreshToken } from "./api";
import { http } from "./request";
import { logoutSuccess } from "../store/auth";

/**
 * As importing store here will create a cyclic dependency
 * So this is a work-around to get dispatch working from here
 * Once store has been initialized, it will call setDispatch
 * method provided here
 */
let _dispatch;
export const setDispatch = (dispatch) => (_dispatch = dispatch);

export const handleResponse = (response) => {
  if (response.config.url === "/o/token/") {
    setTokenResponse(response.data);
  }
  return response.data;
};

let newToken = null;

export const handleError = async (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      /**
       * Access Token has expired, so need to refresh the access token
       */
      try {
        newToken = await refreshToken();
        const config = error.config;
        config.headers["Authorization"] = "Bearer " + newToken.access_token;
        /**
         * Resend the original request
         */
        return await http.request(config);
      } catch (err) {
        if (err.error === "invalid_grant") {
          /**
           * Refresh Token also didn't work, navigate the user to login screen
           */
          _dispatch(logoutSuccess());
        } else {
          throw err;
        }
      }
    }
    throw error.response.data;
  }
  throw error.message;
};

export const setAuthorizationHeader = async (config) => {
  const headers = config.headers;
  headers["Authorization"] = "Bearer " + getAccessToken();
  return { ...config, headers };
};
