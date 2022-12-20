import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";
import 'chart.js/auto';

import { DASHBOARDS, GET, INITIATIVES, OBJECTIVES, PERSPECTIVES } from "../../utils/constants";
import Speedometer from "../common/speedometer";
import DashboardsSidebar from "./dashboardsSidebar";
import HistoricalChart from "../common/histoticalChart";
import "./index.scss";
import Overview from "./overview";
import { makeRequest } from "../../utils/requestUtils";
import { fetchPerspectivesURL, objectiveHistoryURL, perspectiveHistoryURL, roleHistoryURL } from "../../services/urls";
import ReportChildObjects from "./childObjects";
import { getCurrentDashboardObject, getDashboardObjects } from "../../utils"; 


const DashboardTab = ({ loadedIn, year }) => {
    if (!loadedIn) {
        loadedIn = DASHBOARDS;
    }

    if (!year) {
        const date = new Date();
        year = date.getFullYear();
    }

    const pathArray = [];
    const { setActiveCompMemberNav } = useOutletContext();
    const [perspectives, setPerspectives] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    let objects = perspectives;
    let currentObject = {
        percentage_score: 0,
        percentage_target: 0
    }
    const { role, mode, currentObjectID } = useParams();
    const modeToObjectsMapper = {
        perspectives: OBJECTIVES,
        objectives: INITIATIVES,
        undefined: PERSPECTIVES
      }
    const historyURLModeMapper = {
        perspectives: perspectiveHistoryURL(currentObjectID, year),
        objectives: objectiveHistoryURL(currentObjectID),
        undefined: roleHistoryURL(role, year)
    }
    const historyURL = historyURLModeMapper[mode];
    const childrenTitle = modeToObjectsMapper[mode];

    if (mode && perspectives.length > 0) {
        currentObject = getCurrentDashboardObject(perspectives, mode, currentObjectID);
        objects = getDashboardObjects(currentObject, mode);
    }

    if (!mode && perspectives.length > 0) {
        for (const perspective of perspectives) {
            currentObject.percentage_score += perspective.percentage_score * perspective.weight;
            currentObject.percentage_target += perspective.percentage_target * perspective.weight;
        }
    }

    const actualPercentage = currentObject?.percentage_score/100;
    const plannedPercentage = currentObject?.percentage_target/100;

    useEffect(() => {
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                perspectives && setPerspectives(perspectives);
            });
            
    }, [role]);

    useEffect(() => {

        makeRequest(historyURL, GET, null, true, false)
            .then(data => {
                data && setHistoricalData(data);
            });
            
    }, [historyURL]);

    useEffect(() => {
        setActiveCompMemberNav(DASHBOARDS);
    }, []);

    return (
        <Row className="dashboards_tab">
            
            {
                loadedIn === DASHBOARDS &&
                <Col lg="3" className="dashboards_sidebar_cont">
                    <DashboardsSidebar perspectives={ perspectives } />
                </Col>
            }
            <Col className="charts">
                {
                    perspectives.length > 0 && <Row className="speedometers">
                    <Col className="actual">
                        <Speedometer title="Actual" percent={ actualPercentage } description="actual perfomance" />
                    </Col>
                    <Col className="planned">
                        <Speedometer title="Planned" percent={ plannedPercentage } description="planned perfomance" />
                    </Col>
                </Row>
                }
                {
                    loadedIn === DASHBOARDS && mode !== INITIATIVES &&
                    <Row className="overview">
                        <Overview objects={ objects } title={ childrenTitle }/>
                    </Row>
                }
                <Row className="historical_chart">
                    <HistoricalChart chartData={ historicalData } title="Historical Chart" />
                </Row>
                {
                    loadedIn === DASHBOARDS && mode !== INITIATIVES &&
                    <Row>
                        <ReportChildObjects objects={ objects } title={ childrenTitle } />
                    </Row>
                }
            </Col>
        </Row>
    )
}

export default DashboardTab;
