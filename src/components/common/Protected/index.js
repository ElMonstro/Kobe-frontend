import { Navigate } from "react-router-dom";
import {connect} from 'react-redux';


const Protected = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        
    return <Navigate to="/admin/login" replace />;
    }
    return children;
};

const mapStateToProps = ({authReducer}) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
) (Protected);
