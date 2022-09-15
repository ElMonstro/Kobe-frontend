import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../common/openCloseIcon";


import "./index.scss";
import ViewObjective from "./viewObjective";

const ViewPerspective = ({name, initiative}) => {

    const [isOpen, setIsOpen] = useState(false);

    let objectivesClassName;
    isOpen? objectivesClassName="objectives": objectivesClassName="hidden";

    const handleClick = e => {
        setIsOpen(!isOpen);
    }

    return (
        <Row className="perspective">
            <Row>
                <Col className="">
                    <Row>
                    <Col>
                        <Row>
                            <Col onClick={ handleClick }>
                                <OpenCloseIcon 
                                    handleclick={ handleClick } 
                                    defaultMode={ isOpen } 
                                    />
                                    <span className="name">Financial</span>
                            </Col>
                            <Col><span className="type">perspective</span></Col>
                        </Row>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>50%</Col>
                        <Col>40%</Col>
                        <Col><div className="perfomance good"></div></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={ objectivesClassName }>
                <ViewObjective />
                <ViewObjective />
            </Row>
        
        
            
        </Row>
    )
}

export default ViewPerspective;
