import React from "react";
import { Card, Col, Row } from "react-bootstrap";


import "./index.scss";
import ViewInitiative from "./viewInitiative";

const ViewObjective= ({name, measure}) => {


    return (
        <Row className="objective">
            <Row>
                <Col>
                    <span className="objective_name">Customer assistance programmes</span>
                    <span className="type">objective</span>
                </Col>
                <Col>
                    <Col className="status">Approved</Col>
                    <Col className="measure">Increase in profit</Col>
                    <Col className="weight">30%</Col>
                    <Col>50%</Col>
                    <Col>40%</Col>
                    <Col><span className="perfomance"></span></Col>
                </Col>
            </Row>
            <Row className="intiatives">
                <ViewInitiative />
                <ViewInitiative />
                <ViewInitiative />
            </Row>
        </Row>
    )
}

export default ViewObjective;
