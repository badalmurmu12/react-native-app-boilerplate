import { combineReducers } from "redux";
import { reducer as auth } from "./auth";


const reducers = {auth};
const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => {
  if(action.type === 'LOGOUT_SUCCESS'){
    state = undefined;
  }
    return appReducer(state, action);
};

export default rootReducer;
