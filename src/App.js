import { Route, Routes, HashRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { 
  ORG_STRUCTURE, PERSPECTIVES, CASCADE, 
  REVEIEW_PERIOD, SEND_EMAILS,
  SCORECARD, CREATE, CASCADED, 
  VIEW, UPDATE, STRATEGY_MAP, 
  LINKS, OBJECTIVE, SCORE, 
  DASHBOARDS, OVER_VIEW, OVERALL, 
  REPORTS, LIST, DASHBOARD, 
  APPRAISAL, RESET_PASSWORD, DELETE, 
  WEIGHTS, APPRAISE 
} 
from "./utils/constants";

import AdminDashboard from "./components/adminDashboard";
import StaffDashboard from "./components/staffDashboard";
import Protected from "./components/common/Protected";
import { isLoggedInFromLocalStorage } from "./utils";
import store from "./redux/store/store";
import { changeLoginStatus } from "./redux/actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import AuthModal from "./components/modals/authModal";
import ScorecardCont from "./components/scorecardCont";
import ScorecardCreate from "./components/ScorecardCreate";
import CascadedCards from "./components/cards/cascadedCards";
import ViewScorecard from "./components/viewScorecard";
import UpdateScorecardCard from "./components/cards/updateScorecardCard";
import StrategyMapCont from "./components/strategyMapCont";
import StrategyMapCreate from "./components/strategyMapCreate";
import StrategyMapView from "./components/viewStrategyMap";
import ApprovalModal from "./components/approvalCont/";
import ObjectiveApprovalView from "./components/approvalCont/objectiveAmendApprovalCont";
import ApprovalLinksCont from "./components/approvalCont/linksCont";
import NotificationsModal from "./components/notificationsModal"
import ScoreUpdateAprroveCont from "./components/approvalCont/scoreUpdateCont";
import DashboardTab from "./components/dashboardsTab";
import OverviewTab from "./components/overviewTab";
import ReportsTab from "./components/reportsTab";
import ReportSelection from "./components/reportsTab/reportSelection";
import ListsReport from "./components/listReport";
import AppraisalReport from "./components/appraisal";
import ProfileModal from "./components/modals/profileModal";
import InitiativeDeleteRequest from "./components/approvalCont/viewDeletedInitiative";
import AdminLanding from "./components/AdminLanding";
import EditObjectivesWeights from "./components/updateTopObjectivesWeight";
import SurveyModal from "./components/modals/surveyModal";
import Appraise from "./components/createImprovementPlan";
import AppraisalApproval from "./components/approvalCont/appraisalApproval";

function App({ isLoggedIn, showNotifications }) {

  const loggedIn = isLoggedInFromLocalStorage();

  useEffect (() => {
    store.dispatch(changeLoginStatus(loggedIn));
    
  }, [loggedIn]);
  
  return (
    <HashRouter>
    <ToastContainer limit={4}/>
      <AuthModal show={!isLoggedIn}/>
      <ProfileModal />
      <SurveyModal />
      { showNotifications && <NotificationsModal /> }
        <Routes>
          <Route index element={<Protected> <StaffDashboard /> </Protected>} />
          <Route path="/reset-password/:resetToken" element={<AuthModal show={true} form={ RESET_PASSWORD }/>} ></Route>
          <Route path="/landing" element={<Protected> <AdminLanding /> </Protected>} />
          <Route exact path="/:companyId/admin" element={
            <Protected> 
              <AdminDashboard activeComponent={ORG_STRUCTURE} /> 
            </Protected>} 
          /> 
          <Route path="/:companyId/admin/perspectives" element={
            <Protected> 
              <AdminDashboard activeComponent={PERSPECTIVES} /> 
            </Protected>} 
          />
          <Route path="/:companyId/admin/cascade"  element={
            <Protected> 
              <AdminDashboard activeComponent={CASCADE} /> 
            </Protected>} 
            />
          <Route path="/:companyId/admin/review-period" element={
            <Protected> 
              <AdminDashboard activeComponent={REVEIEW_PERIOD} />
            </Protected>} 
          />
          <Route path="/:companyId/admin/send-emails" element={
            <Protected> 
              <AdminDashboard activeComponent={SEND_EMAILS} /> 
            </Protected>} 
          />
          <Route path="/admin/login" element={
            <AdminDashboard activeComponent={ORG_STRUCTURE} isLoggedOut={!isLoggedIn}/>} 
          />
          <Route path=":approvalToken/approve" element={<ApprovalModal />} >
          <Route index element={ <ObjectiveApprovalView /> } />
            <Route path={ OBJECTIVE } element={ <ObjectiveApprovalView /> } />
            <Route path={ LINKS } element={ <ApprovalLinksCont /> } />
            <Route path={ SCORE } element={ <ScoreUpdateAprroveCont /> } />
            <Route path={ DELETE } element={ <InitiativeDeleteRequest /> } />
            <Route path={ APPRAISAL } element={ <AppraisalApproval /> } />
          </Route>
          <Route path="/:role" element={<Protected> <StaffDashboard /> </Protected>} >
            <Route index element={<ScorecardCont />} />
            <Route path={ SCORECARD } element={<ScorecardCont />} >
              <Route index element={ <ViewScorecard />}/>
              <Route path={ CREATE } element={ <ScorecardCreate/> }/>
              <Route path={`${CREATE}/:initiativeId/:mode`} element={ <ScorecardCreate/> }/>
              <Route path={ CASCADED } element={ <CascadedCards />}/>
              <Route path={ VIEW } element={ <ViewScorecard />} />
              <Route path={ UPDATE } element={ <UpdateScorecardCard />} />
              <Route path={ WEIGHTS } element={ <EditObjectivesWeights />} />
              <Route path={ APPRAISE } element={ <Appraise />} />
            </Route>
            <Route path={ DASHBOARDS } element={ <DashboardTab /> }>
              <Route path={ OVERALL } element={ <DashboardTab /> } />
              <Route index path={ `:mode/:currentObjectID` } element={ <DashboardTab /> } />
            </Route>
            <Route path={ REPORTS } element={ <ReportsTab /> } >
              <Route index element={ <ReportSelection /> } />
              <Route path={ `:year/:period/${LIST}` } element={ <ListsReport /> } />
              <Route path={ `:year/:period/${DASHBOARD}` } element={ <DashboardTab loadedIn={ REPORTS } personalData/> } >
                <Route path={ OVERALL } element={ <DashboardTab /> } />
                <Route index path={ `:mode/:currentObjectID` } element={ <DashboardTab /> } />
              </Route>
              <Route path={ `:year/:period/${APPRAISAL}` } element={ <AppraisalReport /> } />
            </Route>
            <Route path={ OVER_VIEW } element={ <OverviewTab /> } />
            <Route element={ <Protected> <StrategyMapCont /> </Protected>} path={ STRATEGY_MAP }>
              <Route index element={ <StrategyMapView /> } />
              <Route element={ <StrategyMapCreate/> } path={ CREATE } />
              <Route element={ <StrategyMapView /> } path={ VIEW }/>
            </Route>
          </Route>
          <Route path="/login" element={ <StaffDashboard /> } />
        </Routes>
    </HashRouter>
  );
}

const mapStateToProps = ({ authReducer: { isLoggedIn, showNotifications } }) => ({
  isLoggedIn,
  showNotifications
});

export default connect(
  mapStateToProps,
) (App);
