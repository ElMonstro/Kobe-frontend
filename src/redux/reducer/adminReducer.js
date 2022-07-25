import {
    SET_COMPANY_INFO,
    SET_SETTINGS,
} from "../actions/actionTypes";

const initialState = {
    settings: {},
    companyInfo: {}
};

const adminReducer = ( state=initialState, action ) => {
    switch (action.type){
        case SET_SETTINGS:
            const { settings } = action;
            return {...state, settings};
        case SET_COMPANY_INFO:
            const { companyInfo } = action;
            return {...state, companyInfo};
            
        default:
            return state;
    }
};

export default adminReducer;
