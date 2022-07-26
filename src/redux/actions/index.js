import { FETCH_COMPANY_INFO, FETCH_SETTINGS, SET_COMPANY_INFO, SET_SETTINGS, USER_LOGGED_IN } from "./actionTypes";

export const changeLoginStatus = isLoggedIn => ({
    type: USER_LOGGED_IN,
    isLoggedIn,
});

export const setSettings = settings => ({
    type: SET_SETTINGS,
    settings
});

export const fetchSettings = () => ({
    type: FETCH_SETTINGS
});

export const setCompanyInfo = settings => ({
    type: SET_COMPANY_INFO,
    settings,
});

export const fetchCompanyInfo = () => ({
    type: FETCH_COMPANY_INFO
});
