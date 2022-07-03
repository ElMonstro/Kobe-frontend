import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {ChevronDown} from '@styled-icons/bootstrap/ChevronDown'

import './index.scss';
import src from "../../../assets/josh_logo.jpg"
import logo from "../../../assets/logo.svg"

const Header = (props) => {
    return (
        <Navbar className="nav_bar" bg="light" variant="light">
            <Container className="header_container" fluid>
                <Navbar.Brand href="#home" >
                    <img className="logo" 
                            src={logo} 
                            alt="logo"
                        />
                    <span className="company_name">
                        Eurochem Limited
                    </span>
                    
                    </Navbar.Brand>
                    
                <Nav className="avatar_menu">
                    <div className="avatar_container">
                        <img className="avatar" 
                            src={src} 
                            alt="user pic"
                        />
                    </div>
                        
                        
               
                    <span  className="user_name">
                            Jerry
                    </span>
                    <NavDropdown eventKey={1} 
                    id="nav_dropdown"
                    title = {(<ChevronDown/ >)}>
                    

                        <NavDropdown.Item eventKey={1.1} className="nav_item">Profile</NavDropdown.Item >
                        <NavDropdown.Item eventKey={1.3} className="nav_item">
                            Logout
                        </NavDropdown.Item >
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
