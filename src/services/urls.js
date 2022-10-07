import baseUrl from './baseURL';

const baseURL = baseUrl();
export const loginURL = `${baseURL}/auth/login/`;
export const settingsURL = `${baseURL}/administration/settings/`;
export const companyInfoURL = `${baseURL}/administration/company-info/`;
export const uploadOrgChartURL = `${baseURL}/administration/org-chart/`;
export const fetchOrgChartURL = `${baseURL}/auth/org-chart/`;
export const sendEmailsURL = `${baseURL}/administration/send-auth-emails/`;
export const fetchUnderlingsURL = `${baseURL}/scorecard/role/fetch-underlings/`;
export const createObjectiveURL = `${baseURL}/scorecard/objectives/`;
export const fetchSelfCascadedInitURL = `${baseURL}/scorecard/objectives/?type=self_cascaded_init`;
export const fetchInitiativeURL = `${baseURL}/scorecard/objectives/`;
export const updateObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/`;
export const createObjectiveFromInitURL = (id, mode) => `${baseURL}/scorecard/objectives/${id}/initiative-to-objective/?mode=${mode}`;
export const editObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/initiative-to-objective/?mode=edit`;
export const fetchPerspectivesURL = role =>  `${baseURL}/scorecard/role/${role}/perspectives/`;

