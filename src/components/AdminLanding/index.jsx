import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { GET, POST } from "../../utils/constants";
import Company from "./company";
import LandingAdminHeader from "../common/header/landingAdminHeader";
import CompanyForm from "./companyForm";
import { yupCompanyValidation } from "../../utils/validators";
import { setCompanies } from "../../redux/actions";
import EditCompanyModal from "./editCompanyModal";

const AdminLanding = ({ setCompanies, companies }) => {

    useEffect(() => { 
        makeRequest(getURLs().fetchCompanies, GET, null, true, false)
        .then(data => data && setCompanies(data));
      }, []);

    const onSubmitCompany = (values, { resetForm, setErrors }) => {
        makeRequest(getURLs().fetchCompanies, POST, values, true, true, false, '', '', setErrors)
            .then(data => {
                if (data) {
                    setCompanies([...companies, data]);
                    resetForm();
                }
            });
    };

    const initialValues = {
        name: '',
        rest_server: '',
        grpc_server: '',
        email_domain: ''
    };
       
    return (
        <div>
            <div className="cont admin_landing">
                <LandingAdminHeader />
                <EditCompanyModal />
                <Container fluid className="inner-cont">
                    <Row> 
                        <Col lg="3">
                            <div className="title">
                                Add  Company
                            </div>
                            <CompanyForm 
                                initialValues={initialValues} 
                                onSubmit={onSubmitCompany} 
                                enableReinitialize={false}
                                validationSchema={ yupCompanyValidation }
                                />
                        </Col>
                        <Col >
                                <div className="title">
                                    Companies
                                </div>
                                <div className="titles">
                                    <Row > 
                                        <Col>
                                            <div >
                                              &nbsp; Logo
                                            </div>
                                        </Col> 
                                        <Col>
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
                                        <Col>
                                            <span>
                                                Actions
                                            </span> 
                                        </Col>
                                    </Row>
                                </div>
                                    
                            {
                                companies.map(company => <Company key={company.id} {...company}/>)
                            }
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    setCompanies,
}

const mapStateToProps = ({ adminReducer: { companies } }) => ({
    companies,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminLanding);
