import { USER_LOGGED_IN } from "./actionTypes";

export const changeLoginStatus = isLoggedIn => ({
    type: USER_LOGGED_IN,
    isLoggedIn,
});
