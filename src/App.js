import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ORG_STRUCTURE, PERSPECTIVES, CASCADE, REVEIEW_PERIOD, SEND_EMAILS } from "./utils/constants";

import Dashboard from './components/adminDashboard';
import Protected from './components/common/Protected';
import { isLoggedInFromLocalStorage } from './utils';
import store from './redux/store/store';
import { changeLoginStatus } from './redux/actions';

function App() {

  const isLoggedIn = isLoggedInFromLocalStorage();
  store.dispatch(changeLoginStatus(isLoggedIn));
  
  return (
    <BrowserRouter>
    <ToastContainer limit={8}/>
        <Routes>
          <Route exact path="/admin" element={<Protected> <Dashboard activeComponent={ORG_STRUCTURE} /> </Protected>} /> 
          <Route path="/admin/perspectives" element={<Protected> <Dashboard activeComponent={PERSPECTIVES} /> </Protected>} />    
          <Route path="/admin/cascade"  element={<Protected> <Dashboard activeComponent={CASCADE} /> </Protected>} />
          <Route path="/admin/review-period" element={<Protected> <Dashboard activeComponent={REVEIEW_PERIOD} /> </Protected>} />
          <Route path="/admin/send-emails" element={<Protected> <Dashboard activeComponent={SEND_EMAILS} /> </Protected>} />
          <Route path="/admin/login" element={<Dashboard activeComponent={ORG_STRUCTURE} isLoggedOut={!isLoggedIn}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
