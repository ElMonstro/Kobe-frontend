import React from "react";
import { Card, Col, Row } from "react-bootstrap";


import "./index.scss";

const ViewScorecard = props => {

    
    return (
        <div className="view_scorecard">
            <Row className="header">
                    <Col>
                        Name
                    </Col>
                    <Col>
                        <Row>
                            <Col> Status </Col>
                            <Col> Measure </Col>
                            <Col> Weight </Col>
                            <Col> Target </Col>
                            <Col> Score  </Col>
                            <Col> Perfomance  </Col>
                        </Row>
                    </Col>
                </Row>
            <Card className="staff_card">
                
            </Card>
        </div>
    )
}

export default ViewScorecard;
