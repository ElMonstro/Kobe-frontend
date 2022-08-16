import { Navigate } from "react-router-dom";
import {connect} from 'react-redux';


const Protected = ({ isLoggedIn, children, user: { is_admin } }) => {
    let toUrl;
    
    is_admin? toUrl = "/admin/login": toUrl = "/login";
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        
    return <Navigate to={ toUrl } replace />;
    }

    return children;
};

const mapStateToProps = ({authReducer}) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
) (Protected);
