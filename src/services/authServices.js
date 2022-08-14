import axios from 'axios';
import { loginURL } from './urls';
import baseUrl from './baseURL';


import { getHeaderDetails, checkSessionStatus } from '../utils';

export default class AuthService {

    static async loginUser(userDetails) {
        try{
            const { email, password } = userDetails;
            const newUser = { email, password }
            const response = await axios.post(loginURL, newUser);
            console.log(response)

            return response;
            
        }catch (error) {
            console.log(error)
        }
            
    }

    static async fetchProfile() {
        try{
            const url = `${baseUrl()}/auth/profile/`;
            const response = await axios.get(url, getHeaderDetails());
            return response;
        }catch (error) {
            return error.response.data
        }
            
    }

    static async fetchCompanyProfile() {
        try{
            const url = `${baseUrl()}/auth/get-company/`;
            const response = await axios.get(url, getHeaderDetails());
            return response;
        }catch (error) {
            checkSessionStatus(error.response);
            return error.response.data
        }
            
    }

    static async sendPasswordResetEmail(data) {
        try{
            const url = `${baseUrl()}/reset-password/send-email/`;
            const response = await axios.post(url, data);
        }catch (error) {
            
        }
            
    }

    static async ResetPassword(data) {
        try{
            const url = `${baseUrl()}/reset-password/`;
            const response = await axios.patch(url, data);
             return response;
        }catch (error) {
            return error.response
        }
            
    }
}
