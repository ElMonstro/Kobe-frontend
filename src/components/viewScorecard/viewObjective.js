import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../common/openCloseIcon";

import "./index.scss";
import ViewInitiative from "./viewInitiative";

const ViewObjective= ({name, measure}) => {

    const [isOpen, setIsOpen] = useState(false);

    let initiativesClassName;
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";

    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className="objective">
            <Row className="top_row">
                <Col className="first_half">
                    <Row className="objective_row">
                        <Col>
                            <OpenCloseIcon 
                                handleclick={ handleClick } 
                                defaultMode={ isOpen } 
                            />
                            <span className="name" 
                                onClick={ handleClick }>
                                Customer assistance programmes
                            </span>
                        </Col>
                        <Col><span className="type">objective</span></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className="status">Approved</Col>
                        <Col className="measure">Increase in profit</Col>
                        <Col className="weight">30%</Col>
                        <Col>50%</Col>
                        <Col>40%</Col>
                        <Col><div className="perfomance poor"></div></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={ initiativesClassName } >
                <ViewInitiative />
                <ViewInitiative />
                <ViewInitiative />
            </Row>
        </Row>
    )
}

export default ViewObjective;
