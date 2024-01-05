import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";
import { useOutletContext } from "react-router-dom";

const InitiativeDeleteRequest = () => {
    const { objective } = useOutletContext();
    return (
        <Row className="objective">
            <Row>
                <Col lg="2" className="label">Initiative Name:</Col>
                <Col className="name">{ objective?.name }</Col>
            </Row>
            <Row>
                <Col lg="2" className="label">Cascaded Owner:</Col>
                <Col className="name">{ objective?.role.user.first_name } { objective?.role.user.second_name }</Col>
            </Row>
            
        </Row>
    )
}

export default InitiativeDeleteRequest;
