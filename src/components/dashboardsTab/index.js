import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";
import 'chart.js/auto';

import { DASHBOARDS, GET, OVER_VIEW, QUATERLY, REPORTS, YEAR_TO_DATE } from "../../utils/constants";
import DashboardsSidebar from "./dashboardsSidebar";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import { fetchPerspectivesURL, fetchReportPerspectives, objectiveHistoryURL, 
        perspectiveHistoryURL, roleHistoryURL } from "../../services/urls";
import { getCurrentDashboardObject, getDashboardObjects } from "../../utils"; 
import DashboardCharts from "./dashboardCharts";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";
import { connect } from "react-redux";


const DashboardTab = ({ loadedIn, personalData, review_period }) => {
    if (!loadedIn) {
        loadedIn = DASHBOARDS;
    }
    let period_name;
    review_period === 3? period_name = "Quaterly": period_name = "Biannually"
    let { year } = useParams();
    let perspectivesURL;
    const pathArray = [];
    let componentRef = useRef();
    const [perspectives, setPerspectives] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    let objects = perspectives;
    let currentObject = {
        percentage_score: 0,
        percentage_target: 0,
        current_period_target: 0,
        last_period_score: 0
    }
    const { role, mode, currentObjectID, period } = useParams();
    const [dataContext, setDataContext] = useState(YEAR_TO_DATE)
    const outletContext = useOutletContext();

    if (loadedIn === REPORTS ) { // set year and perspectives url depending on dashoard container
        perspectivesURL = fetchReportPerspectives(role, year, period);
    } else {
        const date = new Date();
        year = date.getFullYear();
        perspectivesURL = fetchPerspectivesURL(role);

    }

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
        for (let perspective of perspectives) {
            currentObject.percentage_score += perspective.percentage_score * perspective.weight/100;
            currentObject.percentage_target += perspective.percentage_target * perspective.weight/100;
            currentObject.current_period_target += perspective.current_period_target * perspective.weight/100;
            currentObject.last_period_score += perspective.last_period_score * perspective.weight/100;
        }
    }

    useEffect(() => {
        makeRequest(perspectivesURL, GET, null, true, false)
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
        loadedIn === DASHBOARDS && outletContext.setActiveCompMemberNav(DASHBOARDS);
    }, []);

    return (
        <Row className="dashboards_tab">
            
            <div className="dashboard_btns_cont">
                <div className="dashboard_btns">
                    <div className="performance_context_switch dashboard_btn">
                        <select id="performance_context_switch" onChange={ e => setDataContext(e.target.value) }>
                            <option key={ YEAR_TO_DATE } value={ YEAR_TO_DATE }>Year to date</option>
                            <option key={ QUATERLY } value={ QUATERLY }>{ period_name }</option>
                        </select>
                    </div>
                    <ReactToPrint
                        trigger={() => <div className="print_btn dashboard_btn">
                                            <span className="text"> print </span>
                                            <Printer />
                                        </div>
                            }
                        content={() => componentRef}
                    />
                </div>
            </div>
                
            {
                loadedIn !== OVER_VIEW &&
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
                    personalData={ personalData }
                    historyChart
                    dataContext={ dataContext }
                />
            </Col>
        </Row>
    )
}

const mapStateToProps = ({ adminReducer: { settings: { review_period } } }) => ({
    review_period,
  });
  
export default connect(
    mapStateToProps,
  ) (DashboardTab);
