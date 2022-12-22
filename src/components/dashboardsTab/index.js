import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";
import 'chart.js/auto';

import { DASHBOARDS, GET } from "../../utils/constants";
import DashboardsSidebar from "./dashboardsSidebar";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import { fetchPerspectivesURL, objectiveHistoryURL, perspectiveHistoryURL, roleHistoryURL } from "../../services/urls";
import { getCurrentDashboardObject, getDashboardObjects } from "../../utils"; 
import DashboardCharts from "./dashboardCharts";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";


const DashboardTab = ({ loadedIn, year }) => {
    if (!loadedIn) {
        loadedIn = DASHBOARDS;
    }

    if (!year) {
        const date = new Date();
        year = date.getFullYear();
    }

    const pathArray = [];
    let componentRef = useRef();
    const { setActiveCompMemberNav } = useOutletContext();
    const [perspectives, setPerspectives] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    let objects = perspectives;
    let currentObject = {
        percentage_score: 0,
        percentage_target: 0
    }
    const { role, mode, currentObjectID } = useParams();
    
    const historyURLModeMapper = {
        perspectives: perspectiveHistoryURL(currentObjectID, year),
        objectives: objectiveHistoryURL(currentObjectID),
        undefined: roleHistoryURL(role, year)
    }
    const historyURL = historyURLModeMapper[mode];

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
            <div className="dashboard_btns">
                <ReactToPrint
                        trigger={() => <div className="print">
                                            <span className="text"> print </span>
                                            <Printer />
                                        </div>
                            }
                        content={() => componentRef}
                />
            </div>
            
            {
                loadedIn === DASHBOARDS &&
                <Col lg="3" className="dashboards_sidebar_cont">
                    <DashboardsSidebar perspectives={ perspectives } />
                </Col>
            }
            <Col className="charts">
                <DashboardCharts 
                    objects={ objects }
                    mode={ mode }
                    loadedIn={ loadedIn }
                    perspectives={ perspectives }
                    currentObject={ currentObject }
                    historicalData={ historicalData }
                    ref={(el) => (componentRef = el)}
                />
            </Col>
        </Row>
    )
}

export default DashboardTab;
