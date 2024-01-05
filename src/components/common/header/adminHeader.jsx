import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'
import { connect } from "react-redux";

import './index.scss';
import defaultLogo from "../../../assets/logo.svg"
import { BASE_CLOUDINARY_URL } from "../../../services/baseURL";
import { logout } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { GET } from "../../../utils/constants";
import { 
    fetchCompanyInfo, 
    fetchSettings, 
    setSettings, 
    setCompanyInfo, 
    setUser,
    setOrgChart,
} 
from "../../../redux/actions";
import getURLs from "../../../services/urls";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "styled-icons/evaicons-solid";


const AdminHeader = ({ 
    companyInfo, setSettings, 
    setCompanyInfo, setUser,
    setOrgChart,
    isLoggedIn, fetchSettings
    }) => {

    const { name: companyName, logo } = companyInfo;
    const user = JSON.parse(localStorage.getItem('user'));
    const { companyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const { adminCompanyInfoURL, adminOrgChartURL, adminSettingsURL } = getURLs();
        
        if (!companyName ) {
            fetchSettings()
            makeRequest(adminSettingsURL(companyId), GET, null, true, false)
                .then( data => {
                    data && setSettings(data);
                });


            makeRequest(adminCompanyInfoURL(companyId), GET, null, true, false)
                .then( data => {
                    data && setCompanyInfo(data)}
                );
            
            makeRequest(adminOrgChartURL(companyId), GET, null, true, false)
                .then( data => setOrgChart(data));

        }         
        
        setUser(user);

    }, [isLoggedIn]);
    
    return (
        <Navbar className="nav_bar fixed-top" bg="light" variant="light">
            <div className="back" onClick={() => navigate('/landing')}>
                    <ArrowBack />
            </div>
            <Container className="header_container" fluid>
                <Navbar.Brand >
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
                      
                    <div lg="4" className="avatar_container avatar_child">   
                        {
                        <div className="avatar letter_avatar">
                            { user?.first_name?.charAt(0) }
                        </div> 
                        }

                        <span  className="user_name">
                            { user?.first_name || "Menu"}
                        </span>
                    </div>
                    <div lg="2" className="avatar_child">
                        <NavDropdown eventkey={1} 
                            id="nav_dropdown"
                            title = {(<ChevronDown/ >)}>
                        
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
    setOrgChart
}

const mapStateToProps = ({ adminReducer: { companyInfo, orgChart }, authReducer: { isLoggedIn }, }) => ({
    companyInfo,
    isLoggedIn,
    userRole: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminHeader);
