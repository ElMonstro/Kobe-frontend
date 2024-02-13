import baseUrl, { sockets_url } from './baseURL';

const accessToken = JSON.parse(window.localStorage.getItem('tokens'))?.access;

const getURLs = () => {
    const baseURL = baseUrl();
    const urls = {}
    urls.loginURL = `${baseURL}/auth/login/`;
    urls.settingsURL = `${baseURL}/administration/settings/`;
    urls.companyInfoURL = `${baseURL}/administration/company-info/`;
    urls.uploadOrgChartURL = `${baseURL}/administration/org-chart/`;
    urls.fetchOrgChartURL = `${baseURL}/auth/org-chart/`;
    urls.sendEmailsURL = `${baseURL}/administration/send-auth-emails/`;
    urls.fetchUnderlingsURL = `${baseURL}/scorecard/role/fetch-underlings/`;
    urls.createObjectiveURL = `${baseURL}/scorecard/objectives/`;
    urls.updateWeightsURL = `${baseURL}/scorecard/objectives/update-weights/`;
    urls.fetchSelfCascadedInitURL = `${baseURL}/scorecard/objectives/?is_self_cascaded=true`;
    urls.fetchCascadedObjectiveURL = `${baseURL}/scorecard/objectives/?is_self_cascaded=false`;
    urls.updateObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/`;
    urls.amendObjectiveURL = (id, mode) => `${baseURL}/scorecard/objectives/${id}/amend/?mode=${mode}`;
    urls.fetchPerspectivesURL = role =>  `${baseURL}/scorecard/role/${role}/perspectives/`;
    urls.fetchStrategyMapPerspectivesURL = `${baseURL}/scorecard/objectives/strategy-map/`;
    urls.linkObjectiveURL = id => `${baseURL}/scorecard/objectives/${id}/link-objectives/`;
    urls.fetchApprovalObject = approvalToken =>  `${baseURL}/scorecard/approvals/${approvalToken}/`;
    urls.fetchNotificationsURL = `${baseURL}/auth/notifications/`;
    urls.setSeenNotificationsURL = `${baseURL}/auth/notifications/set-seen/`;
    urls.socketsMessagesURL = `${sockets_url}/messages/?token=${accessToken}`;
    urls.fetchUnderAllUnderlingsUrl = (role, year, period) => `${baseURL}/auth/underlings-scores/role/${role}/years/${year}/periods/${period}/`;
    urls.roleHistoryURL = (role, year) => `${baseURL}/scorecard/role/${role}/years/${year}/`;
    urls.objectiveHistoryURL = (id) => `${baseURL}/scorecard/objectives/${id}/history/`;
    urls.perspectiveHistoryURL = (id, year) => `${baseURL}/scorecard/perspectives/${id}/years/${year}/`;
    urls.fetchYearsURL = `${baseURL}/scorecard/years/`;
    urls.fetchReportPerspectives = (role, year, period) => `${baseURL}/scorecard/history/${role}/years/${year}/periods/${period}/`;
    urls.updatePasswordURL =  `${baseURL}/auth/update-password/`;
    urls.resetPasswordURL = (resetToken) => `${baseURL}/auth/reset-password/${resetToken}/`;
    urls.resetPasswordRequestURL =  `${baseURL}/auth/reset-password-request/`;
    urls.updateRoleURL =  `${baseURL}/auth/update-role/`;
    urls.fetchApproversURL =  `${baseURL}/auth/fetch-approvers/`;
    urls.deleteinitiativeURL = id => `${baseURL}/scorecard/objectives/${id}/delete/`;
    urls.deletemilestoneURL = id => `${baseURL}/scorecard/objectives/milestones/${id}/delete/`;
    urls.fetchPeriodsURL = `${baseURL}/scorecard/periods/`;
    urls.fetchAuthURL = domain => `${baseURL}/administration/fetch-auth-url/?domain=${domain}`;
    urls.fetchCompanies = `${baseURL}/administration/companies/`;
    urls.adminOrgChartURL = companyId =>`${baseURL}/administration/companies/${companyId}/org-chart/`;
    urls.adminCompanyInfoURL = companyId =>`${baseURL}/administration/companies/${companyId}/`;
    urls.adminSettingsURL = companyId =>`${baseURL}/administration/companies/${companyId}/settings/`;
    urls.adminInitCompany  = companyId =>`${baseURL}/administration/companies/${companyId}/initialize/`;
    urls.adminCreateCompanyUser = companyId =>`${baseURL}/administration/companies/${companyId}/create-user/`;
    urls.adminCreateGlobalBehaviorals = companyId =>`${baseURL}/administration/companies/${companyId}/behaviorals/`;
    urls.adminDeleteBehaviorals = companyId =>`${baseURL}/administration/companies/${companyId}/behaviorals/delete/`;
    
    return urls
};

export default getURLs;
