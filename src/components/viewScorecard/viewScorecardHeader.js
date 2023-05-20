import React from "react";
import { Col, Row } from "react-bootstrap";

import './index.scss';


const ObjectivesHeader = () => {

    return (
        <Row className="header">
                <Col className="name">
                    Name
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col> Status </Col>
                        <Col className="measure"> Measure </Col>
                        <Col> Weight </Col>
                        <Col> Target </Col>
                        <Col> Score (%)  </Col>
                    </Row>
                </Col>
        </Row>
            
    )
}

export default ObjectivesHeader;
