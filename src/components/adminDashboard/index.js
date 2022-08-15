import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';

import Header from "../common/header";
import AdminSidebar from "../adminSidebar"
import AdminOrgStructureCont from "../orgStructureContAdmin";
import PerspectivesCont from "../perspectivesContAdmin";
import ReviewPeriodCont from "../reviewPeriodCont";
import CascadeCutoffCont from "../cascadeCutoffCont";

import { 
    fetchCompanyInfo, 
    fetchSettings, 
    setSettings, 
    setOrgChart, 
    setCompanyInfo, 
    setShowConfirmationModal,
    setUser
} 
    from "../../redux/actions";

import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import SendEmailCont from "../sendEmailsCont";


const AdminDashboard = props => {

    const activeComponentMapper = {
        orgStructure: AdminOrgStructureCont,
        perspectives: PerspectivesCont,
        cascade: CascadeCutoffCont,
        reviewPeriod: ReviewPeriodCont,
        send_emails: SendEmailCont
    }

    const { activeComponent, fetchSettings, fetchCompanyInfo } = props;
    const ActiveComponent = activeComponentMapper[activeComponent];

    useEffect(() => {
        fetchSettings();
        fetchCompanyInfo();
      }, []);
       
    return (
        <div>
            <Header />
            <div className="cont">
                <Container fluid className="inner-cont">
                    <Row> 
                        <Col xs lg="3">
                            <AdminSidebar activeComponent={ activeComponent }/>
                        </Col>
                        <Col xs lg="15">
                            <ActiveComponent { ...props }/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    fetchSettings,
    fetchCompanyInfo,
    setSettings,
    setCompanyInfo,
    setOrgChart,
    setShowConfirmationModal,
    setUser
}

const mapStateToProps = ({ adminReducer, authReducer }) => ({
    ...adminReducer,
    ...authReducer
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminDashboard);
