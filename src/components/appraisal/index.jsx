import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import 'chart.js/auto';

import { GET } from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";
import AppraisalCharts from "./appraisalCharts";
import { connect } from "react-redux";
import { createOverallCurrentObject } from "../../utils";


const AppraisalReport = ({ settings }) => {
    
    let { year, role, period } = useParams();
    let componentRef = useRef();
    const [perspectives, setPerspectives] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    const objects = perspectives;
    const currentObject = createOverallCurrentObject(perspectives)
 

    useEffect(() => {
        makeRequest(getURLs().fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                if (perspectives) {
                    setPerspectives(perspectives);

                    const objectives = [];
                    const initiatives = [];
                    perspectives.forEach(perspective =>
                        perspective.objectives && objectives.concat(perspective.objectives)
                    )
                    setObjectives(objectives);

                    objectives.forEach(objective =>
                        objective.initiatives && initiatives.concat(objective.initiatives)
                    );
                    
                    setInitiatives(initiatives);
                }

            });

    }, [role]);

    useEffect(() => {

        makeRequest(getURLs().roleHistoryURL(role, year), GET, null, true, false)
            .then(data => {
                data && setHistoricalData(data);
            });

    }, []);

    return (
        <Row className="appraisal">

            <div className="dashboard_btns">
                <ReactToPrint
                        trigger={() => <div className="print_btn dashboard_btn">
                                            <span className="text"> print </span>
                                            <Printer />
                                        </div>
                            }
                        content={() => componentRef}
                    />
            </div>
            <AppraisalCharts 
                perspectives={ perspectives } 
                objectives={ objectives } 
                initiatives={ initiatives } 
                historicalData={ historicalData } 
                objects={ objects } 
                currentObject={ currentObject }
                ref={(el) => (componentRef = el)}
                settings={ settings }
                year = { year }
                period = { period }
            />
        </Row>
    )
}

const mapStateToProps = ({ adminReducer: { settings } }) => ({
    settings
});

export default connect(
    mapStateToProps,
)(AppraisalReport);
