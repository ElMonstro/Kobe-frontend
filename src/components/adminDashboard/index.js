import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from 'react-redux';


import Header from "../common/header";
import AdminSidebar from "../adminSidebar"
import AdminOrgStructureCont from "../orgStructureContAdmin";
import PerspectivesCont from "../perspectivesContAdmin";
import ReviewPeriodCont from "../reviewPeriodCont";
import CascadeCutoffCont from "../cascadeCutoffCont";
import LoginModal from "../modals/loginModal";

import { fetchCompanyInfo, fetchSettings, setSettings, setOrgChart, setCompanyInfo } from "../../redux/actions";

import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";


const Dashboard = props => {

    const activeComponentMapper = {
        orgStructure: AdminOrgStructureCont,
        perspectives: PerspectivesCont,
        cascade: CascadeCutoffCont,
        reviewPeriod: ReviewPeriodCont,
    }

    const { activeComponent, isLoggedOut, fetchSettings, fetchCompanyInfo } = props;
    const ActiveComponent = activeComponentMapper[activeComponent];

    useEffect(() => {
        fetchSettings();
        fetchCompanyInfo();
      }, []);
       

    return (
        <div>
            {isLoggedOut && <LoginModal isLoggedOut={isLoggedOut}/>}
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
    setOrgChart
}

const mapStateToProps = ({ adminReducer }) => ({
    ...adminReducer,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Dashboard);
