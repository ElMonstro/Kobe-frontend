import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

import { DASHBOARDS } from "../../utils/constants";
import Speedometer from "../common/speedometer";
import DashboardsSidebar from "./dashboardsSidebar";
import "./index.scss";

const DashboardTab = () => {

    const { setActiveCompMemberNav } = useOutletContext();

    useEffect(() => {
        setActiveCompMemberNav(DASHBOARDS);
    }, []);

    return (
        <Row className="dashboards_tab">
            <Col lg="3" className="dashboards_sidebar_cont">
                <DashboardsSidebar />
            </Col>
            <Col className="charts">
                <Row>
                    <Col className="actual">
                        <Speedometer title="Actual" percent={0.45} />
                    </Col>
                    <Col className="planned">
                        <Speedometer title="Planned" percent={0.21} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default DashboardTab;
