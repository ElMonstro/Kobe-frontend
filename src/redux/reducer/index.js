import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import { LOGOUT } from '../actions/actionTypes';

const appReducer = combineReducers({
    authReducer,
    adminReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
      }

    return appReducer(state, action)
  }

export default rootReducer;
