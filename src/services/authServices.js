import { loginURL } from './urls';
import { notificationHandler } from '../utils/requestUtils';
import axios from 'axios';

export default class AuthService {

    static async loginUser(userDetails) {
        try{
            const { email, password } = userDetails;
            const newUser = { email, password }
            return await axios.post(loginURL, newUser);
            
        }catch (error) {
            notificationHandler(error.response, null, error.response.data.detail)
            console.log(error)
        }
            
    }     
}

