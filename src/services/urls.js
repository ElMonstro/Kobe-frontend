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
export const fetchSelfCascadedInitURL = `${baseURL}/scorecard/objectives/?is_self_cascaded=true`;
export const fetchCascadedObjectiveURL = `${baseURL}/scorecard/objectives/?is_self_cascaded=false`;
export const updateObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/`;
export const createObjectiveFromInitURL = (id, mode) => `${baseURL}/scorecard/objectives/${id}/initiative-to-objective/?mode=${mode}`;
export const editObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/initiative-to-objective/?mode=edit`;
export const fetchPerspectivesURL = role =>  `${baseURL}/scorecard/role/${role}/perspectives/`;
export const fetchStrategyMapObjectivesURL = `${baseURL}/scorecard/objectives/strategy-map/`;
export const linkObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/link-objectives/`;
export const fetchApprovalObject = approvalToken =>  `${baseURL}/scorecard/approvals/${approvalToken}/`;

