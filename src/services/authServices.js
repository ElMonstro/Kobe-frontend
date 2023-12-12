import { notificationHandler } from '../utils/requestUtils';
import axios from 'axios';
import getURLs from './urls';

export default class AuthService {

    static async loginUser(userDetails) {
        try{
            const { email, password } = userDetails;
            const newUser = { email, password }
            return await axios.post(getURLs().loginURL, newUser);
            
        }catch (error) {
            notificationHandler(error.response, null, error.response.data.detail)
            console.log(error)
        }
            
    }     
}

