import React, { useEffect, useRef } from "react";
import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'
import { connect } from "react-redux";

import './index.scss';
import defaultAvatar from "../../../assets/defaultAvatar.png";
import defaultLogo from "../../../assets/logo.svg"
import { BASE_CLOUDINARY_URL } from "../../../services/baseURL";
import { countUnreadNotifications, getPeriods, logout } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { GET } from "../../../utils/constants";
import LoginForm from "../../modals/authModal";
import { 
    fetchCompanyInfo, 
    fetchSettings, 
    setSettings, 
    setCompanyInfo, 
    setUser,
    setOrgChart,
    setPeriods,
    setNotifications,
    setShowNotifications,
    setShowProfile,
    setShowSurvey
} 
from "../../../redux/actions";
import bell from "../../../assets/bell.svg";
import getURLs from "../../../services/urls";


const Header = ({ 
    companyInfo, setSettings, 
    setCompanyInfo, setUser,
    setOrgChart, setPeriods, 
    isLoggedIn, setNotifications, 
    setShowNotifications, notifications,
    userRole, setShowProfile, fetchSettings,
    setShowSurvey
    }) => {

    const { name: companyName, logo } = companyInfo;
    const user = JSON.parse(localStorage.getItem('user'));
    const notificationsNumber = countUnreadNotifications(notifications);
    const profile_pic_url = userRole?.profile_pic? BASE_CLOUDINARY_URL + userRole.profile_pic: defaultAvatar;
    const interval = useRef();

    const fetchNotifications = () => {
        console.log("fetching notifications");
        makeRequest(getURLs().fetchNotificationsURL, GET, null, true, false)
        .then(data => {
            data && setNotifications(data.results);
        });
    }

    const handleNotificationsClick = () => setShowNotifications(true);

    useEffect(() => {

        const { companyInfoURL, fetchOrgChartURL, settingsURL } = getURLs();

        if (!companyName ) {
            fetchSettings()
            makeRequest(settingsURL, GET, null, true, false)
                .then( data => {
                    if (data) {
                        setSettings(data);
                        setShowSurvey(Boolean(data?.surveys.length));
                        setPeriods(getPeriods(data.review_period));
                    }
                    
                });

            makeRequest(companyInfoURL, GET, null, true, false)
                .then( data => {
                    data && setCompanyInfo(data)}
                );
            
            makeRequest(fetchOrgChartURL, GET, null, true, false)
                .then( data => setOrgChart(data));

            clearInterval(interval.current);
            fetchNotifications();
            interval.current = setInterval(fetchNotifications, 120000);
        }         
        
        setUser(user);
        user && setShowProfile(!(user.is_password_updated) && !user.is_admin);

    }, [isLoggedIn]);
    
    return (
        <Navbar className="nav_bar fixed-top" bg="light" variant="light">
            <LoginForm />
            <Container className="header_container" fluid>
                <Navbar.Brand href={ user?.is_admin? "/admin": "/"} >
                    <img className="logo" 
                        src={ logo? BASE_CLOUDINARY_URL + logo: defaultLogo } 
                        alt="logo"
                    />
                    <span className="company_name">
                        { companyName || "Kobe Limited"}
                    </span>
                    
                </Navbar.Brand>  
                <Nav className="avatar_menu">
                    <div className="avatar_row">
                        {
                            !user?.is_admin && <div className="notifications avatar_child" onClick={ handleNotificationsClick }>
                                <img className="notification_bell" 
                                    src={ bell } 
                                    alt="notifications"
                                />
                                {
                                    notificationsNumber > 0 && <span className="notification_number">{ notificationsNumber }</span>
                                }
                            </div> 
                        }
                    <div lg="4" className="avatar_container avatar_child">   
                        {
                        user?.is_admin? 
                        <div className="avatar letter_avatar">
                            { user?.first_name?.charAt(0) }
                        </div> :

                        <img className="avatar" 
                            src={ profile_pic_url } 
                            alt="user pic"
                        />
                        }

                        <span  className="user_name">
                            { user?.first_name || "Menu"}
                        </span>
                    </div>
                    <div lg="2" className="avatar_child">
                        <NavDropdown eventkey={1} 
                            id="nav_dropdown"
                            title = {(<ChevronDown/ >)}>
                        
                            { !user?.is_admin &&
                                <NavDropdown.Item eventkey={1.1} onClick={ () => setShowProfile(true) } className="nav_item">
                                    Profile
                                </NavDropdown.Item >
                            }
                            <NavDropdown.Item eventkey={1.2} onClick={ () => logout() } className="nav_item">
                                Logout
                            </NavDropdown.Item >
                        </NavDropdown>
                    </div>
                    </div>
                </Nav>

            </Container>
        </Navbar>
    );
};

const mapDispatchToProps = {
    fetchSettings,
    fetchCompanyInfo,
    setSettings,
    setCompanyInfo,
    setUser,
    setOrgChart,
    setPeriods,
    setNotifications,
    setShowNotifications,
    setShowProfile, 
    setShowSurvey
}

const mapStateToProps = ({ adminReducer: { companyInfo, orgChart }, authReducer: { isLoggedIn, notifications }, }) => ({
    companyInfo,
    isLoggedIn,
    notifications, 
    userRole: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Header);
