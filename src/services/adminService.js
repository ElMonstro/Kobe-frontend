
import { makeRequest } from '../utils/requestUtils';
import { GET } from '../utils/constants';
import getURLs from './urls';

const urls = getURLs();
export default class AdminService {

    static async fetchSettings() {
       const data = await makeRequest(urls.settingsURL, GET, null, true);
       return data;  
    }

    static async fetchCompanyInfo() {
        const data = await makeRequest(urls.companyInfoURL, GET, null, true);
        return data;  
     }
}
