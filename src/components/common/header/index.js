import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'

import './index.scss';
import src from "../../../assets/josh_logo.jpg"
import defaultLogo from "../../../assets/logo.svg"
import { base_cloudinary_url } from "../../../services/baseURL";
import { logout } from "../../../utils";
import { makeRequest } from "../../../utils/requestUtils";
import { GET } from "../../../utils/constants";
import { companyInfoURL, settingsURL } from "../../../services/urls";
import LoginForm from "../../modals/loginModal";


const Header = ({ companyInfo, setSettings, setCompanyInfo }) => {

     const { name, logo } = companyInfo;

    useEffect(() => {
        companyInfo !== {} && makeRequest(settingsURL, GET, null, true, false)
            .then( data => setSettings(data))
        companyInfo !== {} && makeRequest(companyInfoURL, GET, null, true, false)
            .then( data => setCompanyInfo(data))
    }, []);
    
    return (
        <Navbar sticky="top" className="nav_bar" bg="light" variant="light">
            <LoginForm />
            <Container className="header_container" fluid>
                <Navbar.Brand href="#home" >
                    <img className="logo" 
                        src={ logo? base_cloudinary_url + logo: defaultLogo } 
                        alt="logo"
                    />
                    <span className="company_name">
                        { name? name: "Eurochem Limited"}
                    </span>
                    
                    </Navbar.Brand>
                    
                <Nav className="avatar_menu">
                    <div className="avatar_container">
                        <img className="avatar" 
                            src={ src } 
                            alt="user pic"
                        />
                    </div>
                        
                        
               
                    <span  className="user_name">
                        Jerry
                    </span>
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
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
