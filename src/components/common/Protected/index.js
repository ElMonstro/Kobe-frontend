import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';


const Protected = ({ isLoggedIn, children, user }) => {
    let toUrl;
    
    user?.is_admin? toUrl = "/admin/login": toUrl = "/";
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
