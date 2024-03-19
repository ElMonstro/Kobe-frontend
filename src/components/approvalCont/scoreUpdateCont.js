import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

import ViewObjectiveScores from "./viewObjectiveScoreUpdate";


const ScoreUpdateAprroveCont = () => {

    const { objective, evidence} = useOutletContext();
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
        </div>
    )
}

export default ScoreUpdateAprroveCont;
