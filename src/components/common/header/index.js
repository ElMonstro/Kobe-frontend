import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'
import { connect } from "react-redux";

import './index.scss';
import src from "../../../assets/josh_logo.jpg";
import defaultLogo from "../../../assets/logo.svg"
import { base_cloudinary_url } from "../../../services/baseURL";
import { countUnreadNotifications, getPeriods, logout } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { GET } from "../../../utils/constants";
import { companyInfoURL, fetchNotificationsURL, fetchOrgChartURL, settingsURL } from "../../../services/urls";
import LoginForm from "../../modals/loginModal";
import { 
    fetchCompanyInfo, 
    fetchSettings, 
    setSettings, 
    setCompanyInfo, 
    setUser,
    setOrgChart,
    setPeriods,
    setNotifications,
    setShowNotifications
} 
from "../../../redux/actions";
import bell from "../../../assets/bell.svg";


const Header = ({ companyInfo, setSettings, setCompanyInfo, setUser, setOrgChart, setPeriods, isLoggedIn, setNotifications, setShowNotifications, notifications }) => {

    const { name: companyName, logo } = companyInfo;
    const user = JSON.parse(localStorage.getItem('user'));
    const notificationsNumber = countUnreadNotifications(notifications);

    const handleNotificationsClick = () => setShowNotifications(true);

    useEffect(() => {

        if (!companyName) {
            makeRequest(settingsURL, GET, null, true, false)
                .then( data => {
                    data && setSettings(data);
                    data && setPeriods(getPeriods(data.review_period));
                });


            makeRequest(companyInfoURL, GET, null, true, false)
                .then( data => {
                    data && setCompanyInfo(data)}
                );
            
            makeRequest(fetchOrgChartURL, GET, null, true, false)
                .then( data => setOrgChart(data));
            
            makeRequest(fetchNotificationsURL, GET, null, true, false)
                .then(data => {
                    data && setNotifications(data);
                })
        }         
        

        setUser(user);

    }, [isLoggedIn]);
    
    return (
        <Navbar sticky="top" className="nav_bar" bg="light" variant="light">
            <LoginForm />
            <Container className="header_container" fluid>
                <Navbar.Brand href={ user?.is_admin? "/admin": "/"} >
                    <img className="logo" 
                        src={ logo? base_cloudinary_url + logo: defaultLogo } 
                        alt="logo"
                    />
                    <span className="company_name">
                        { companyName? companyName: "Eurochem Limited"}
                    </span>
                    
                </Navbar.Brand>  
                <Nav className="avatar_menu">
                    <Row>
                        <Col lg="3" className="notifications" onClick={ handleNotificationsClick }>
                            <img className="notification_bell" 
                                src={ bell } 
                                alt="notifications"
                            />
                            {
                                notificationsNumber > 0 && <span className="notification_number">{ notificationsNumber }</span>
                            }
                        </Col> 
                    <Col lg="4" className="avatar_container">   
                        {
                        user?.is_admin? 
                        <div className="avatar letter_avatar">
                            { user?.first_name?.charAt(0) }
                        </div> :

                        <img className="avatar" 
                            src={ src } 
                            alt="user pic"
                        />
                        }

                        <span  className="user_name">
                            { user?.first_name?user?.first_name: "Menu"}
                        </span>
                    </Col>
                    <Col lg="2">
                        <NavDropdown eventkey={1} 
                            id="nav_dropdown"
                            title = {(<ChevronDown/ >)}>
                        
                            <NavDropdown.Item eventkey={1.1} className="nav_item">
                                Profile
                            </NavDropdown.Item >
                            <NavDropdown.Item eventkey={1.2} onClick={ () => logout() } className="nav_item">
                                Logout
                            </NavDropdown.Item >
                        </NavDropdown>
                    </Col>
                    </Row>
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
    setShowNotifications
}

const mapStateToProps = ({ adminReducer: { companyInfo }, authReducer: { isLoggedIn, notifications }, }) => ({
    companyInfo,
    isLoggedIn,
    notifications
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Header);
