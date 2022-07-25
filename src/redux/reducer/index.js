import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    authReducer,
    adminReducer
});

export default rootReducer;
