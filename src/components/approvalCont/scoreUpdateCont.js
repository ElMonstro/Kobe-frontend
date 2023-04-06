import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

import ViewObjectiveScores from "./viewObjectiveScoreUpdate";


const ScoreUpdateAprroveCont = () => {

    const { objective, approve, reject, evidence} = useOutletContext();
    return (
        <div className="view_objective">
            <Row className="header">
                <Col lg="4">
                    Name
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col> Budget </Col>
                        <Col> Cost </Col>
                        <Col> Target </Col>
                        <Col> Score  </Col>
                        <Col> Evidence  </Col>
                    </Row>
                </Col>
            </Row>
            <div className="original_objective">
                <div className="objective_header">Original Scores</div>
                <ViewObjectiveScores { ...objective?.approved_objective } />
            </div>
            <div className="objective_header">Updated Scores</div>
            <ViewObjectiveScores { ...objective } evidence={ evidence } />
            <div className="approval_buttons">
                <Button onClick={ approve } className="response_button approve">Approve</Button>
                <Button onClick={ reject } className="response_button reject">Reject</Button>
            </div>
            
        </div>
    )
}

export default ScoreUpdateAprroveCont;
