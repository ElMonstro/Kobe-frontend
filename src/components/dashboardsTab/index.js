import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";

import { DASHBOARDS, GET } from "../../utils/constants";
import Speedometer from "../common/speedometer";
import DashboardsSidebar from "./dashboardsSidebar";
import HistoricalChart from "../common/histoticalChart";
import 'chart.js/auto';

import "./index.scss";
import Overview from "./overview";
import { makeRequest } from "../../utils/requestUtils";
import { fetchPerspectivesURL } from "../../services/urls";
import ChildObjects from "./childObjects";

const DashboardTab = ({ mode }) => {
    if (!mode) {
        mode = DASHBOARDS;
    }

    const { setActiveCompMemberNav } = useOutletContext();

    const [perspectives, setPerspectives] = useState([]);
    let objects = perspectives;
    let currentObject;

    const { role, currentObjectID, currentObjectType } = useParams();

    if (!currentObjectID || currentObjectType) {
        
    }

    useEffect(() => {
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                perspectives && setPerspectives(perspectives);
            });
    }, [role])

    useEffect(() => {
        setActiveCompMemberNav(DASHBOARDS);
    }, []);

    return (
        <Row className="dashboards_tab">
            {
                mode === DASHBOARDS &&
                <Col lg="3" className="dashboards_sidebar_cont">
                    <DashboardsSidebar perspectives={ perspectives } />
                </Col>
            }
            <Col className="charts">
                <Row className="speedometers">
                    <Col className="actual">
                        <Speedometer title="Actual" percent={ 0.45 } description="actual perfomance" />
                    </Col>
                    <Col className="planned">
                        <Speedometer title="Planned" percent={ 0.8 } description="planned perfomance" />
                    </Col>
                </Row>
                {
                    mode === DASHBOARDS &&
                    <Row className="overview">
                        <Overview objects={ objects } mode={"perspectives"}/>
                    </Row>
                }
                <Row className="historical_chart">
                    <HistoricalChart title="Historical Chart" />
                </Row>
                {
                    mode === DASHBOARDS &&
                    <Row>
                        <ChildObjects objects={ perspectives } title="perspectives" />
                    </Row>
                }
            </Col>
        </Row>
    )
}

export default DashboardTab;
