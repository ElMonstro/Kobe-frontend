import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";

const ViewObjectiveScores = ({ name, score, cost, target, budget }) => {

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
                        <Col>{ target && target * 100 }</Col>
                        <Col>{ score && score * 100 }</Col>
                    </Row>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewObjectiveScores;
