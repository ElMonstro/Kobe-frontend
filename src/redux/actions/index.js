import { 
    FETCH_COMPANY_INFO, FETCH_ORG_CHART,
    FETCH_SETTINGS, SET_COMPANY_INFO, SET_ORG_CHART, 
    SET_SETTINGS, SET_USER, SHOW_CONF_MODAL, USER_LOGGED_IN,
    SET_PERIODS,
    SET_CURRENT_ROLE,
    SET_SHOW_NOTIFICATIONS,
    SET_NOTIFICATIONS,
    SET_WEB_SOCKET,
    SET_SHOW_PROFILE,
    SET_PROFILE_PIC,
    SET_PERSPECTIVE_ORDER
    } from "./actionTypes";

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

export const setCompanyInfo = companyInfo => ({
    type: SET_COMPANY_INFO,
    companyInfo,
});

export const fetchCompanyInfo = () => ({
    type: FETCH_COMPANY_INFO
});

export const fetchOrgChart = () => ({
    type: FETCH_ORG_CHART
});

export const setOrgChart = orgChart => ({
    type: SET_ORG_CHART,
    orgChart: [orgChart] 
});

export const setShowConfirmationModal = showConfirmationModal => ({
    type: SHOW_CONF_MODAL,
    showConfirmationModal,
});

export const setUser = user => ({
    type: SET_USER,
    user,
});

export const setPeriods = periods => ({
    type: SET_PERIODS,
    periods,
});

export const setCurrentRole = currentRole => ({
    type: SET_CURRENT_ROLE,
    currentRole,
});

export const setShowNotifications = showNotifications => ({
    type: SET_SHOW_NOTIFICATIONS,
    showNotifications,
});

export const setNotifications = notifications => ({
    type: SET_NOTIFICATIONS,
    notifications,
});

export const setWebSocket = webSocket => ({
    type: SET_WEB_SOCKET,
    webSocket,
});

export const setShowProfile = showProfile => ({
    type: SET_SHOW_PROFILE,
    showProfile,
});

export const setProfilePic = role => ({
    type: SET_PROFILE_PIC,
    role,
});

export const setPerspectiveOrder = perspectiveOrder => ({
    type: SET_PERSPECTIVE_ORDER,
    perspectiveOrder,
});
