import {
    USER_LOGGED_IN,
} from "../actions/actionTypes";

const initialState = {
    user: {},
    isLoggedIn: false
};

const authReducer = ( state=initialState, action ) => {
    switch (action.type){
        case USER_LOGGED_IN:
            const { isLoggedIn } = action;
            return {...state, isLoggedIn}
            
        default:
            return state;
    }
};

export default authReducer;
