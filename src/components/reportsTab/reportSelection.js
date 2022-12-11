import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import dashboardIcon from "../../assets/dashboards.svg";
import listsIcon from "../../assets/lists.svg";
import appraisalIcon from "../../assets/appraisal.svg";

const ReportSelection = props => {
       
    return (
        <div className="report_selection">
            <div className="header">
                <span>Select Report</span>
            </div>
            <div className="report_type">
                <Row className="reports">
                    <Col>
                        <div id="dashboard" className="report_icon selected">
                            <img src={ dashboardIcon } alt=""></img>
                        </div>
                        <span className="label">Dashboards</span>

                    </Col>
                    <Col>
                        <div id="lists" className="report_icon">
                            <img src={ listsIcon } alt=""></img>
                        </div>
                        <span className="label">Lists</span>
                    </Col>
                    <Col>
                        <div id="appraisal" className="report_icon">
                            <img src={ appraisalIcon } alt=""></img>
                        </div>
                        <span className="label">Appraisal</span>
                    </Col>
                  
                </Row>
            </div>
            <div className="period_selection">
                <div className="label">Select Period</div>
                <div className="inputs">
                    <select name="year" id="year">
                        <option value="volvo">2021</option>
                        <option value="saab">2022</option>
                        <option value="mercedes">2023</option>
                        <option value="audi">2024</option>
                    </select>
                    <select name="period" id="cars">
                        <option value="quarter 1">quater 1</option>
                        <option value="quarter 2">quater 2</option>
                        <option value="quater 3">quater 3</option>
                        <option value="quater 4">quater 4</option>
                    </select>
                    <br />
                    <Button className="view_report">View Report</Button>
                </div>
            </div>
            
        </div>
    )
};


export default ReportSelection
