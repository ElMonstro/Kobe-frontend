import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";
import initiativeIcon from "../../../assets/initiative.svg";

const ViewSidebarInitiative = ({ name }) => {

    return (
        <Row className="initiative">
            <Row>
                <Col>  
                    <img className="icon" src={ initiativeIcon } alt="icon" />
                    <span className="name">{ name }</span>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewSidebarInitiative;
