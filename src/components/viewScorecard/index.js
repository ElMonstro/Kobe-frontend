import React from "react";
import { Card, Col, Row } from "react-bootstrap";


import "./index.scss";
import ViewPerspective from "./viewPerspective.";

const ViewScorecard = props => {

    
    return (
        <div className="view_scorecard">
            <Row className="header">
                    <Col>
                        Name
                    </Col>
                    <Col className="second_half">
                        <Row>
                            <Col> Status </Col>
                            <Col className="measure"> Measure </Col>
                            <Col> Weight </Col>
                            <Col> Target </Col>
                            <Col> Score  </Col>
                            <Col> Perfomance  </Col>
                        </Row>
                    </Col>
            </Row>
            <Card className="staff_card">
                <ViewPerspective />
            </Card>
        </div>
    )
}

export default ViewScorecard;
