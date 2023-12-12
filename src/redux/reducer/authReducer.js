import {
    SET_AUTH_EMAIL,
    SET_CURRENT_ROLE,
    SET_NOTIFICATIONS,
    SET_SHOW_NOTIFICATIONS,
    SET_SHOW_PROFILE,
    SET_USER,
    SET_WEB_SOCKET,
    SHOW_CONF_MODAL,
    USER_LOGGED_IN,
} from "../actions/actionTypes";

const initialState = {
    user: {},
    isLoggedIn: false,
    showConfirmationModal: false,
    currentRole: {},
    showNotifications: false,
    notifications: [],
    showProfile: false,
    webSocket: null,
    authEmail: '',
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

        case SET_WEB_SOCKET:
            const { webSocket } = action;
            return { ...state, webSocket };

        case SET_SHOW_PROFILE:
            const { showProfile } = action;
            return { ...state, showProfile };

        case SET_AUTH_EMAIL:
            const { authEmail } = action;
            return {...state, authEmail }; 
            
        default:
            return state;
    }
};

export default authReducer;
