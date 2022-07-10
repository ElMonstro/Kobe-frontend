import { BrowserRouter, Route, Routes} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ORG_STRUCTURE, PERSPECTIVES, CASCADE, REVEIEW_PERIOD } from "./utils/constants";

import Dashboard from './components/adminDashboard';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/admin" element={<Dashboard activeComponent={ORG_STRUCTURE}/>}> 
            </Route>
            <Route path="/admin/perspectives" element={<Dashboard activeComponent={PERSPECTIVES}/>}>
                
            </Route>
            <Route path="/admin/cascade"  element={<Dashboard activeComponent={CASCADE}/>}>
                
            </Route>
            <Route path="/admin/review-period" element={<Dashboard activeComponent={REVEIEW_PERIOD}/>}>
                
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
