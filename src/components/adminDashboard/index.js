import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../common/header";
import AdminSidebar from "../adminSidebar"

import './index.scss';
import AdminOrgStructureCont from "../orgStructureAdmin";

const Dashboard = pops => {
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
                        <AdminOrgStructureCont />
                    </Col>
                </Row>
                </Container>
                
            </div>
        </div>
    )
};

export default Dashboard;
