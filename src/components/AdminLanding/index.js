import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';


import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { GET } from "../../utils/constants";
import Company from "./company";
import LandingAdminHeader from "../common/header/landingAdminHeader";

const AdminLanding = () => {

    const [companies, setCompanies] = useState([]);

    useEffect(() => { 
        makeRequest(getURLs().fetchCompanies, GET, null, true, false)
        .then(data => data && setCompanies(data));
      }, []);
       
    return (
        <div>
            <div className="cont admin_landing">
                <LandingAdminHeader />
                <Container fluid className="inner-cont">
                        <Row> 
                            <Col xs lg="9">
                                    <div className="title">
                                        Companies
                                    </div>
                                    <div className="titles">
                                        <Row > 
                                            <Col>
                                                <div className="company_logo">
                                                </div>
                                            </Col> 
                                            <Col xs lg="3">
                                                <span>
                                                    Name
                                                </span> 
                                            </Col>
                                            <Col>
                                                <span>
                                                    Rest Server
                                                </span> 
                                            </Col>
                                            <Col>
                                                <span>
                                                    GPRC Server
                                                </span> 
                                            
                                            </Col>
                                        </Row>
                                    </div>
                                    
                            {
                                companies.map(company => <Company key={company.id} {...company}/>)
                            }
                        </Col>
                        <Col xs lg="9">
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

const mapDispatchToProps = {

}

const mapStateToProps = ({ adminReducer, authReducer }) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminLanding);
