import {
    SET_COMPANY_INFO,
    SET_ORG_CHART,
    SET_PERIODS,
    SET_PERSPECTIVE_ORDER,
    SET_PROFILE_PIC,
    SET_SETTINGS,
} from "../actions/actionTypes";

const initialState = {
    settings: {},
    companyInfo: {},
    orgChart: [],
    periods: [],
    perspectiveOrder: []
};

const adminReducer = ( state=initialState, action ) => {
    switch (action.type) {
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

        case SET_PROFILE_PIC:
            const { role } = action;
            let newOrgChart = { ...state.orgChart[0], ...role};
            newOrgChart = [newOrgChart];
            return {...state, orgChart: newOrgChart};

        case SET_PERSPECTIVE_ORDER:
            const { perspectiveOrder } = action;
            return {...state, perspectiveOrder};
            
        default:
            return state;
    }
};

export default adminReducer;
