import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import initiativeIcon from "../../../assets/initiative.svg";
import { INITIATIVES } from "../../../utils/constants";

const ViewSidebarInitiative = ({ name, id }) => {

    const navigate = useNavigate();
    return (
        <Row className="initiative">
            <Row>
                <Col>  
                    <img onClick={ () => navigate(`${INITIATIVES}/${id}`) } className="icon" src={ initiativeIcon } alt="icon" />
                    <span onClick={ () => navigate(`${INITIATIVES}/${id}`) } className="name">{ name }</span>
                </Col>
            </Row>
        </Row>
    )
}

export default ViewSidebarInitiative;
