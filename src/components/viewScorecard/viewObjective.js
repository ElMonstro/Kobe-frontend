import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../common/openCloseIcon";

import "./index.scss";
import ViewInitiative from "./viewInitiative";

const ViewObjective= ({name, measures, weight, target, score, status, initiatives}) => {

    const [isOpen, setIsOpen] = useState(false);
    const measure_name = measures && measures[0].name

    let initiativesClassName;
    let objectiveClassName;
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    isOpen? objectiveClassName="objective white_bg": objectiveClassName="objective";
    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className={ objectiveClassName }>
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
                                { name }
                            </span>
                        </Col>
                        <Col><span className="type">objective</span></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className="status">Approved</Col>
                        <Col className="measure">{ measure_name }</Col>
                        <Col className="weight">{ weight * 100 }</Col>
                        <Col>{ target * 100 }</Col>
                        <Col>{ score * 100 }</Col>
                        <Col><div className={ `perfomance ${status}`}></div></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={ initiativesClassName } >
                {
                    initiatives.map(initiative => {
                        return <ViewInitiative key={ initiative.id } { ...initiative }/>
                    })
                }
            </Row>
        </Row>
    )
}

export default ViewObjective;
