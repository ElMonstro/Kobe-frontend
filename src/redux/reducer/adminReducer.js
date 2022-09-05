import {
    SET_COMPANY_INFO,
    SET_ORG_CHART,
    SET_PERIODS,
    SET_SETTINGS,
} from "../actions/actionTypes";

const initialState = {
    settings: {},
    companyInfo: {},
    orgChart: [],
    periods: []
};

const adminReducer = ( state=initialState, action ) => {
    switch (action.type){
        case SET_SETTINGS:
            const { settings } = action;
            return {...state, settings};

        case SET_COMPANY_INFO:
            const { companyInfo } = action;
            return {...state, companyInfo};

        case SET_ORG_CHART:
            const { orgChart } = action;
            return {...state, orgChart};

        case SET_PERIODS:
            const { periods } = action;
            return {...state, periods};
            
        default:
            return state;
    }
};

export default adminReducer;
