import React from "react";
import { Col, Row } from "react-bootstrap";
import { SCORECARD } from "../../utils/constants";

import './index.scss';


const ObjectivesHeader = ({ mode }) => {

    let budgetClassName;
    let nameColSize
    mode === SCORECARD? budgetClassName = "hidden": budgetClassName = "";
    mode === SCORECARD? nameColSize = 6: nameColSize = 4;

    return (
        <Row className="header">
                <Col lg={ nameColSize }>
                    Name
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col> Status </Col>
                        <Col className="measure"> Measure </Col>
                        <Col> Weight </Col>
                        <Col className={ budgetClassName }>Budget</Col>
                        <Col className={ budgetClassName }>Cost</Col>
                        <Col> Target </Col>
                        <Col> Score  </Col>
                        <Col> Perfomance  </Col>
                    </Row>
                </Col>
        </Row>
            
    )
}

export default ObjectivesHeader;
