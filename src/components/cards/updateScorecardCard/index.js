import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import "./index.scss";

const UpdateScorecardCard = props => {
    
    return (
        <Card className="staff_card update_scorecard">
            <div className="card_title title">Initiatives</div>
            <div className="initiatives">
                <Row className="title_bar">
                    <Col lg={3}>Name</Col>
                    <Col>Budget</Col>
                    <Col>Cost</Col>
                    <Col>Weight</Col>
                    <Col>Target</Col>
                    <Col>Score</Col>
                    <Col>Status</Col>
                    <Col>Evidence</Col>
                </Row>

                <Row className="initiative">
                    <Col lg={3} className="initiative_name">
                        'selectedElements' is assi
                    </Col>
                    <Col>
                        <div className="budget">
                            15000
                        </div>
                    </Col>
                    <Col>
                        <input placeholder="13000" className="cost_input" />
                    </Col>
                    <Col>
                        25%
                    </Col>
                    <Col>
                        30%
                    </Col>
                    <Col>
                        <input placeholder="15" className="score_input" />
                    </Col>
                    <Col>
                        <span className="status_color poor"></span>
                        <span className="status_text">Poor</span>
                    </Col>
                    <Col>
                        <input placeholder="https://www.google.com"  className="evidence_input" />
                    </Col>
                </Row>

                <Row className="initiative">
                    <Col lg={3} className="initiative_name">
                        'selectedElements' vzvs bavsdfbd zb bzdd vzbz
                    </Col>
                    <Col>
                        <div className="budget">
                            15000
                        </div>
                    </Col>
                    <Col>
                        <input placeholder="13000" className="cost_input" />
                    </Col>
                    <Col>
                        25%
                    </Col>
                    <Col>
                        30%
                    </Col>
                    <Col>
                        <input placeholder="15" className="score_input" />
                    </Col>
                    <Col>
                        <span className="status_color good"></span>
                        <span className="status_text">Good</span>
                    </Col>
                    <Col>
                        <input placeholder="https://www.google.com" className="evidence_input" />
                    </Col>
                </Row>

                <Row className="initiative">
                    <Col lg={3} className="initiative_name">
                        'selectedElements' vzvs bavsdfbd zb bzdd vzbz
                    </Col>
                    <Col>
                        <div className="budget">
                            15000
                        </div>
                    </Col>
                    <Col>
                        <input placeholder="13000" className="cost_input" />
                    </Col>
                    <Col>
                        25%
                    </Col>
                    <Col>
                        30%
                    </Col>
                    <Col>
                        <input placeholder="15" className="score_input" />
                    </Col>
                    <Col>
                        <span className="status_color satisfactory"></span>
                        <span className="status_text">Satisfactory</span>
                    </Col>
                    <Col>
                        <input placeholder="https://www.google.com" className="evidence_input" />
                    </Col>
                </Row>
                
            </div>
            
        </Card>
    )
}

export default UpdateScorecardCard;
