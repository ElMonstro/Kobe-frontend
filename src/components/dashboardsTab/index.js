import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

import { DASHBOARDS } from "../../utils/constants";
import DashboardsSidebar from "./dashboardsSidebar";
import "./index.scss";

const DashboardTab = () => {

    const { setActiveCompMemberNav } = useOutletContext();

    useEffect(() => {
        setActiveCompMemberNav(DASHBOARDS);
    }, []);

    return (
        <Row className="dashboards_tab">
            <Col lg="2" className="dashboards_sidebar_cont">
                <DashboardsSidebar />
            </Col>
            <Col className="charts">
            </Col>
        </Row>
    )
}

export default DashboardTab;
