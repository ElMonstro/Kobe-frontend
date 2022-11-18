import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";

const ViewObjectiveScores = ({ name, score, cost, target, budget, evidence }) => {

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
                            <div className="evidence" onClick={ () => window.open(evidence, "_blank")} >{ evidence }</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewObjectiveScores;
