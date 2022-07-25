import axios from "axios";
import { changeLoginStatus } from "../redux/actions";
import store from "../redux/store/store";
import { fireNotification, getHeaderDetails } from "../utils";
import { ACTION_SUCCESSFUL_MESSAGE, AUTHENTICATION_ERROR_MESSAGE, RESOURCE_NOT_FOUND_MESSAGE } from "./constants";

const requestTypeMapper = {
    post: axios.post,
    get: axios.get,
    patch: axios.patch,
    put: axios.put
}

export const responseHandler = (response, successMessage, errorMessage) => {
    switch (response.status){
        case 200:
            fireNotification('success', 'Success', successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 201:
            fireNotification('success', 'Success', successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 204:
            fireNotification('success', 'Success', successMessage?successMessage:ACTION_SUCCESSFUL_MESSAGE);
            break;
        case 400:
            fireNotification('error', 'Error', errorMessage?errorMessage:response.data.detail)
            break;      
        case 401:
            fireNotification('error', 'Error', AUTHENTICATION_ERROR_MESSAGE);
            localStorage.clear()
            store.dispatch(changeLoginStatus(false));
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
export const makeRequest =  async (url, method, data, authenticated, sucessMessage, errorMessage) => {
    var headerDetails;
    authenticated?  headerDetails = getHeaderDetails(true): headerDetails = null;
    const request = requestTypeMapper[method];
    try {
        const response = await request(url, data, headerDetails);
        console.log(response);
        responseHandler(response, sucessMessage, errorMessage);
        return response.data;
    } catch (error) {
        responseHandler(error.response);
    }
}
