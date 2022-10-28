import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ORG_STRUCTURE, PERSPECTIVES, CASCADE, REVEIEW_PERIOD, SEND_EMAILS, SCORECARD, CREATE, CASCADED, VIEW, UPDATE, STRATEGY_MAP } from "./utils/constants";

import AdminDashboard from './components/adminDashboard';
import StaffDashboard from './components/staffDashboard';
import Protected from './components/common/Protected';
import { isLoggedInFromLocalStorage } from './utils';
import store from './redux/store/store';
import { changeLoginStatus } from './redux/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import LoginModal from './components/modals/loginModal';
import ScorecardCont from './components/scorecardCont';
import ScorecardCreate from './components/ScorecardCreate';
import CascadedCards from './components/cards/cascadedCards';
import ViewScorecard from './components/viewScorecard';
import UpdateScorecardCard from './components/cards/updateScorecardCard';
import StrategyMapCont from './components/strategyMapCont';
import StrategyMapCreate from './components/strategyMapCreate';
import StrategyMapView from './components/viewStrategyMap';


function App({ isLoggedIn }) {

  const loggedIn = isLoggedInFromLocalStorage();
  

  useEffect (() => {
    store.dispatch(changeLoginStatus(loggedIn));
  }, [loggedIn]);

  
  return (
    <BrowserRouter>
    <ToastContainer limit={4}/>
      {!isLoggedIn && <LoginModal isLoggedOut={!isLoggedIn}/>}
        <Routes>
          <Route index element={<Protected> <StaffDashboard /> </Protected>} />
          <Route exact path="/admin" element={<Protected> <AdminDashboard activeComponent={ORG_STRUCTURE} /> </Protected>} /> 
          <Route path="/admin/perspectives" element={<Protected> <AdminDashboard activeComponent={PERSPECTIVES} /> </Protected>} />    
          <Route path="/admin/cascade"  element={<Protected> <AdminDashboard activeComponent={CASCADE} /> </Protected>} />
          <Route path="/admin/review-period" element={<Protected> <AdminDashboard activeComponent={REVEIEW_PERIOD} /> </Protected>} />
          <Route path="/admin/send-emails" element={<Protected> <AdminDashboard activeComponent={SEND_EMAILS} /> </Protected>} />
          <Route path="/admin/login" element={<AdminDashboard activeComponent={ORG_STRUCTURE} isLoggedOut={!isLoggedIn}/>} />
          <Route path="/:role" element={<Protected> <StaffDashboard /> </Protected>} >
            <Route index element={<ScorecardCont />} />
            <Route path={ SCORECARD } element={<ScorecardCont />} >
              <Route index element={ <ViewScorecard />}/>
              <Route path={ CREATE } element={ <ScorecardCreate/> }/>
              <Route path={`${CREATE}/:initiativeId/:mode`} element={ <ScorecardCreate/> }/>
              <Route path={ CASCADED } element={ <CascadedCards />}/>
              <Route path={ VIEW } element={ <ViewScorecard />} />
              <Route path={ UPDATE } element={ <UpdateScorecardCard />} />
            </Route>
            <Route element={ <Protected> <StrategyMapCont /> </Protected>} path={ STRATEGY_MAP }>
              <Route index element={ <StrategyMapView /> } />
              <Route element={ <StrategyMapCreate/> } path={ CREATE } />
              <Route element={ <StrategyMapView /> } path={ VIEW }/>
            </Route>
          </Route>
          <Route path="/login" element={ <StaffDashboard /> } />
        </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = ({ authReducer: { isLoggedIn } }) => ({
  isLoggedIn,
});

export default connect(
  mapStateToProps,
) (App);
