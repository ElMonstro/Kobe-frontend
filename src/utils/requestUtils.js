import axios from "axios";
import { changeLoginStatus } from "../redux/actions";
import store from "../redux/store/store";
import { fireNotification, getHeaderDetails } from "../utils";
import { 
    ACTION_SUCCESSFUL_MESSAGE, 
    AUTHENTICATION_ERROR_MESSAGE, 
    RESOURCE_NOT_FOUND_MESSAGE, 
    NOTIF_SUCCESS, NOTIF_ERROR
 } from "./constants";

const requestTypeMapper = {
    post: axios.post,
    get: axios.get,
    patch: axios.patch,
    put: axios.put
}

export const notificationHandler = (response, successMessage, errorMessage) => {
    switch (response.status){
        case 200:
            fireNotification(NOTIF_SUCCESS, successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 201:
            fireNotification(NOTIF_SUCCESS, successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 204:
            fireNotification(NOTIF_SUCCESS, successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 400:
            fireNotification(NOTIF_ERROR, errorMessage?errorMessage:response.data.detail)
            break;      
        case 401:
            fireNotification(NOTIF_ERROR, AUTHENTICATION_ERROR_MESSAGE);
            break;
        case 403:
            fireNotification('error', 'Error', errorMessage?errorMessage:response.data.detail);
            break;
        case 404:
            fireNotification('error', 'Error', RESOURCE_NOT_FOUND_MESSAGE);
            break;
        default:
            

    }
} 

// Make a function to centralize all backend requests
export const makeRequest =  async (url, method, data, authenticated=true, notify=true, sucessMessage, errorMessage) => {
    let headerDetails;
    const request = requestTypeMapper[method];
    let response;

    authenticated?  headerDetails = getHeaderDetails(true): headerDetails = null;

    try {
        response = await request(url, data, headerDetails);
        console.log(response);
        notify && notificationHandler(response, sucessMessage, errorMessage);
        return response.data;
    } catch (error) {
        notificationHandler(error.response);
        if (error.response.status === 401) {
            localStorage.clear()
            store.dispatch(changeLoginStatus(false));
        }
    }
}
