import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import dashboardIcon from "../../assets/dashboards.svg";
import listsIcon from "../../assets/lists.svg";
import appraisalIcon from "../../assets/appraisal.svg";
import { makeRequest } from "../../utils/requestUtils";
import { APPRAISAL, DASHBOARD, GET, LIST } from "../../utils/constants";
import { fetchYearsURL } from "../../services/urls";


const ReportSelection = ({ periods }) => {
    const [years, setYears] = useState([]);
    const [year, setYear] = useState();
    const [period, setPeriod] = useState();
    const [reportType, setReportType] = useState(DASHBOARD);
    const navigate = useNavigate();

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    const viewReportHandler = () => {
        navigate(`${year}/${period}/${reportType}/`);
    };

    const handleReportClick = report_type => {
        return () => setReportType(report_type);
    };

    const setSelectedClass = activeComponent => {
        let selectedElements = document.getElementsByClassName("chosen");
        selectedElements[0]? selectedElements[0].className = "report_icon": selectedElements=null;
        const newSelectedElement = document.getElementById(activeComponent);
        newSelectedElement.className = "chosen report_icon";
    };

    useEffect(() => {
        setSelectedClass(reportType);
      }, [reportType]);


    useEffect(() => {
        makeRequest(fetchYearsURL, GET, null, true, false)
            .then(data => {
                if (data) {
                    setYears(data);
                    setYear(data[0]?.year);
                }
            });

        setPeriod(periods[0]);
    }, [periods])

    //TODO: error if report has not been created
       
    return (
        <div className="report_selection">
            <div className="header">
                <span>Select Report</span>
            </div>
            <div className="report_type">
                <Row className="reports">
                    <Col>
                        <div id={ DASHBOARD } onClick={ handleReportClick(DASHBOARD) } className="report_icon">
                            <img src={ dashboardIcon } alt=""></img>
                        </div>
                        <span className="label">Dashboards</span>

                    </Col>
                    <Col>
                        <div id={ LIST } onClick={ handleReportClick(LIST) } className="report_icon">
                            <img src={ listsIcon } alt=""></img>
                        </div>
                        <span className="label">Lists</span>
                    </Col>
                    <Col>
                        <div id={ APPRAISAL } onClick={ handleReportClick(APPRAISAL) } className="report_icon">
                            <img src={ appraisalIcon } alt=""></img>
                        </div>
                        <span className="label">Appraisal</span>
                    </Col>
                  
                </Row>
            </div>
            <div className="period_selection">
                <div className="label">Select Period</div>
                <div className="inputs">
                    <select name="year" id="year" onChange={ handleYearChange }>
                        {
                            years.map(year => <option key={ year } value={ year.year }>{ year.year }</option> )
                        }
                    </select>
                    <select name="period" id="period" onChange={ handlePeriodChange }>
                        {
                            periods?.map(period => <option key={ period } value={ period }>{ period }</option>)
                        }
                    </select>
                    <br />
                    <Button className="view_report" onClick={ viewReportHandler }>View Report</Button>
                </div>
            </div>
            
        </div>
    )
};

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { periods }, }) => ({
    periods,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ReportSelection);
