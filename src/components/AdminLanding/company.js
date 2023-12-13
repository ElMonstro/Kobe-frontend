import React from "react";
import { Row, Col } from "react-bootstrap";
import defaultLogo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom";


const Company = ({ logo, name, rest_server,  grpc_server, id }) => {

    const navigate = useNavigate();
       
    return (
        <div className="company" onClick={ () => navigate(`/${id}/admin`)}>
            <Row> 
                <Col>
                    <div className="company_logo">
                        <img  src={logo || defaultLogo } alt="logo"/>
                    </div>
                </Col> 
                <Col xs lg="3">
                    <span>
                        { name }
                    </span> 
                </Col>
                <Col>
                    <span>
                        { rest_server }
                    </span> 
                </Col>
                <Col>
                    <span>
                        { grpc_server }
                    </span> 
                
                </Col>
            </Row>
        </div>
    )
};

export default Company;
