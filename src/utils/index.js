import forge from 'node-forge';
import store from "../redux/store/store.js";
import { changeLoginStatus } from "../redux/actions";

export const getHeaderDetails = () => {
    const localStorage = window.localStorage;
    const accessToken = JSON.parse(localStorage.getItem('tokens')).access;
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    return config;
}

export const isLoggedInFromLocalStorage = () => {
    const localStorage = window.localStorage;
    const tokens = localStorage.getItem('tokens');
    return Boolean(tokens);
}


export const fireNotification = (type, message, description) => {
 
  };


export const notificationHandler = (response, message) => {
    switch (response.status){
        case 200:
            fireNotification('success', 'Success', message);
            break;
        case 201:
            fireNotification('success', 'Success', message);
            break;
        case 204:
            fireNotification('success', 'Success', message);
            break;
        case 400:
            fireNotification('error', 'Error', message?message:response.data.detail)
            break;      
        case 401:
            fireNotification('error', 'Error', 'Authentication Error');
            break;
        case 403:
        fireNotification('error', 'Error', 'You do not have permission to use resource');
            break;
        case 404:
                fireNotification('error', 'Error', 'Resource not found');
                break;
        default:
            

    }
} 


  String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {       
        var reg = new RegExp("\\{" + i + "\\}", "gm");             
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}


export function encryptData( publicKey, string){
    const pubKey = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = pubKey.encrypt(string, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: forge.mgf1.create()
    });
    const base64 = forge.util.encode64(encrypted);
    return base64;

}

export function checkSessionStatus (response) {
    if (response.status === 401) {      
        store.dispatch(changeLoginStatus(false));
    }
}


export const createErrorObjects = (data) => {
    let errorObjects = []
    if (data) {
        Object.keys(data).map(key => {
                errorObjects.push({
                    name: key,
                    errors: data[key]
                })
        })
    } 

    return errorObjects

}
