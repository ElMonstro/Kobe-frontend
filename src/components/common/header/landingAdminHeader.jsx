import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'

import './index.scss';
import defaultLogo from "../../../assets/logo.svg"
import { logout } from "../../../utils";


const LandingAdminHeader = ({ 
    isLoggedIn
    }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

    }, [isLoggedIn]);
    
    return (
        <Navbar className="nav_bar fixed-top" bg="light" variant="light">
            <Container className="header_container" fluid>
                <Navbar.Brand >
                    <img className="logo" 
                        src={ defaultLogo } 
                        alt="logo"
                    />
                    <span className="company_name">
                        { "Kobe Limited"}
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

export default LandingAdminHeader;
