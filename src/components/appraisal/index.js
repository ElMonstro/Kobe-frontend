import React, { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import 'chart.js/auto';

import { GET } from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import {
    fetchPerspectivesURL, roleHistoryURL
} from "../../services/urls";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";
import AppraisalCharts from "./appraisalCharts";
import { connect } from "react-redux";


const AppraisalReport = ({ settings }) => {


    let { year } = useParams();
    let componentRef = useRef();
    const [perspectives, setPerspectives] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const [historicalData, setHistoricalData] = useState([]);
    let objects = perspectives;
    let currentObject = {
        percentage_score: 0,
        percentage_target: 0
    }
    const { role } = useParams();

    for (const perspective of perspectives) {
        currentObject.percentage_score += perspective.percentage_score * perspective.weight;
        currentObject.percentage_target += perspective.percentage_target * perspective.weight;
    }

    useEffect(() => {
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                if (perspectives) {
                    setPerspectives(perspectives);

                    const objectives = [];
                    const initiatives = [];
                    perspectives.map(perspective =>
                        perspective.objectives && objectives.concat(perspective.objectives)
                    )
                    setObjectives(objectives);

                    objectives.map(objective =>
                        objective.initiatives && initiatives.concat(objective.initiatives)
                    );
                    setInitiatives(initiatives);
                }

            });

    }, [role]);

    useEffect(() => {

        makeRequest(roleHistoryURL(role, year), GET, null, true, false)
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
