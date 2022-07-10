import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../common/header";
import AdminSidebar from "../adminSidebar"

import "./index.scss";
import AdminOrgStructureCont from "../orgStructureContAdmin";
import PerspectivesCont from "../perspectivesContAdmin";
import ReviewPeriodCont from "../reviewPeriodCont";
import CascadeCutoffCont from "../cascadeCutoffCont";


const Dashboard = props => {
    const activeComponentMapper = {
        orgStructure: AdminOrgStructureCont,
        perspectives: PerspectivesCont,
        cascade: CascadeCutoffCont,
        reviewPeriod: ReviewPeriodCont 

    }
    const { activeComponent } = props;

    const ActiveComponent = activeComponentMapper[activeComponent];

    return (
        <div>
            <Header />
            <div className="cont">
                <Container fluid className="inner-cont">

                <Row> 
                    <Col xs lg="3">
                        <AdminSidebar />
                    </Col>
                    <Col xs lg="15">
                        <ActiveComponent />
                    </Col>
                </Row>
                </Container>
                
            </div>
        </div>
    )
};

export default Dashboard;
