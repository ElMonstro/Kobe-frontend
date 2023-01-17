import { loginURL } from './urls';
import { POST } from '../utils/constants';
import { makeRequest, notificationHandler } from '../utils/requestUtils';
import axios from 'axios';

export default class AuthService {

    static async loginUser(userDetails) {
        try{
            const { email, password } = userDetails;
            const newUser = { email, password }
            const response = await axios.post(loginURL, newUser);

            return response;
            
        }catch (error) {
            notificationHandler(error.response, null, error.response.data.detail)
            console.log(error)
        }
            
    }     
}

