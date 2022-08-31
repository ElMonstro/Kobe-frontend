import baseUrl from './baseURL';

const baseURL = baseUrl();
export const loginURL = `${baseURL}/auth/login/`;
export const settingsURL = `${baseURL}/administration/settings/`;
export const companyInfoURL = `${baseURL}/administration/company-info/`;
export const uploadOrgChartURL = `${baseURL}/administration/org-chart/`;
export const fetchOrgChartURL = `${baseURL}/auth/org-chart/`;
export const sendEmailsURL = `${baseURL}/administration/send-auth-emails/`;
export const fetchUnderlingsURL = `${baseURL}/scorecard/role/fetch-underlings/`;
