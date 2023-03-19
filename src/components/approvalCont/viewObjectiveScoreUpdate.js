import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";

const ViewObjectiveScores = ({ name, score, cost, target, budget, evidence, evidence_description, is_approved_obj }) => {

    return (
        <Row className="objective">
            <Row className="top_row">
                <Col className="first_half" lg={ 4 }>
                    <Row className="objective_row">
                        <Col>
                            <span className="name">
                                { name }
                            </span>
                        </Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className="budget">{ budget }</Col>
                        <Col className="cost">{ cost }</Col>
                        <Col>{ target }</Col>
                        <Col>{ score }</Col>
                        <Col>
                        {
                            !is_approved_obj && 
                            <div className="evidence" onClick={ () => window.open(evidence, "_blank")} >{ evidence_description }</div>
                        }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewObjectiveScores;
