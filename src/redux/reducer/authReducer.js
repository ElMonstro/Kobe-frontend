import {
    SET_CURRENT_ROLE,
    SET_NOTIFICATIONS,
    SET_SHOW_NOTIFICATIONS,
    SET_USER,
    SHOW_CONF_MODAL,
    USER_LOGGED_IN,
} from "../actions/actionTypes";

const initialState = {
    user: {},
    isLoggedIn: false,
    showConfirmationModal: false,
    currentRole: {},
    showNotifications: false,
    notifications: []
};

const authReducer = ( state=initialState, action ) => {
    switch (action.type){
        case USER_LOGGED_IN:
            const { isLoggedIn } = action;
            return { ...state, isLoggedIn }
        
        case SET_USER:
            const { user } = action;
            return { ...state, user }

        case SHOW_CONF_MODAL:
            const { showConfirmationModal } = action;
            return { ...state, showConfirmationModal };

        case SET_CURRENT_ROLE:
            const { currentRole } = action;
            return { ...state, currentRole };

        case SET_SHOW_NOTIFICATIONS:
            const { showNotifications } = action;
            return { ...state, showNotifications };
        
        case SET_NOTIFICATIONS:
            const { notifications } = action;
            return { ...state, notifications };
            
        default:
            return state;
    }
};

export default authReducer;
