import React from "react";
import { Row, Col } from "react-bootstrap"
import PreviousImprovement from "./previousImprovement";


const ImprovementAreas = ({ appraisal, checkBoxDisabled }) => {

    return (
        <div className="improvement_areas">
            <Row className="appraise_title">
                <Col>Improvement Area</Col>
                <Col>Improvement Activity</Col>
                <Col>Timeline</Col>
                <Col lg={2}>
                    Addressed
                </Col>
            </Row>
            {
                appraisal?.improvement_areas?.map((area, index) => (
                    <PreviousImprovement key={ index } improvement={ area } checkBoxDisabled={ checkBoxDisabled } />
                ))
            }
        </div>
    );
}

export default ImprovementAreas;
