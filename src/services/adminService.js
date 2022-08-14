import { companyInfoURL, settingsURL } from './urls';

import { makeRequest } from '../utils/requestUtils';
import { GET } from '../utils/constants';

export default class AdminService {

    static async fetchSettings() {
       const data = await makeRequest(settingsURL, GET, null, true);
       return data;  
    }

    static async fetchCompanyInfo() {
        const data = await makeRequest(companyInfoURL, GET, null, true);
        return data;  
     }
}
