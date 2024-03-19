import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';


const Protected = ({ children }) => {
    let toUrl;
    const user = JSON.parse(localStorage.getItem('user'));
    user?.is_admin? toUrl = "/admin/login": toUrl = "/login";
    if (!user) {
        
     <Navigate to={ toUrl } replace />;
    }

    return children;
};

export default Protected;
