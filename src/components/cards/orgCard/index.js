import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import Tree from "../../common/Tree/Tree";
import { Col, Row, Spinner} from "react-bootstrap";


import "./index.scss";
import { makeRequest } from "../../../utils/requestUtils";
import { fetchOrgChartURL } from "../../../services/urls";
import { GET } from "../../../utils/constants";


const handleClick = (node) => {
  };

const OrgChartCard = props => {
    const { orgChart, setOrgChart, spinnerState } = props;

    useEffect(() => {
        makeRequest(fetchOrgChartURL, GET, null, true, false).then( data => setOrgChart(data))
    }, []);

    return (
      <div className="org_chart_cont">
        <div className="card_title org_chart_title">Organization Chart Preview</div>

        <Card className="titles_card">
          <Row>
          <Col className="name_title">
              Name
          </Col>
            <Col className="employee_titles">
              <Row>
                <Col className="employee_title"><span>Designation</span></Col>
                <Col className="employee_title"><span>Job Group</span></Col>
                <Col className="employee_title"><span>Staff Number</span></Col>
                <Col className="employee_title"><span>Department</span></Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className="admin_card org_chart_card">

            <div>
            {
            spinnerState? <Spinner animation="border"  variant="info"/>: 
            <Tree data={orgChart} onNodeClick={handleClick} />}
            </div>
        </Card>
      </div>
    )
};

export default OrgChartCard;
