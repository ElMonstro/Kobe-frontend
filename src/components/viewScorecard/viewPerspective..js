import React from "react";
import { Card, Col, Row } from "react-bootstrap";


import "./index.scss";
import ViewObjective from "./viewObjective";

const ViewPerspective = ({name, initiative}) => {


    return (
        <Row className="perspective">
            <Row>
                <Col className="">
                    <span className="objective_name">Customer assistance programmes</span>
                    <span className="type">perspective</span>
                </Col>
                <Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>50%</Col>
                    <Col>40%</Col>
                    <Col><span className="perfomance"></span></Col>
                </Col>
            </Row>
            <Row>
                <ViewObjective />
                <ViewObjective />
            </Row>

        
            
        </Row>
    )
}

export default ViewPerspective;
