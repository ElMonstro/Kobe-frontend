import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { SCORECARD } from "../../utils/constants";
import OpenCloseIcon from "../common/openCloseIcon";

import "./index.scss";
import ViewInitiative from "./viewInitiative";

const ViewObjective = ({ name, measures, weight, target, score, status, initiatives, budget, cost, mode }) => {

    const [isOpen, setIsOpen] = useState(false);
    const measure_name = measures && measures[0].name

    let initiativesClassName;
    let objectiveClassName;
    let budgetClassName;
    let typeClassName;
    let nameColSize;
    
    mode === SCORECARD? budgetClassName = "hidden": budgetClassName = "";
    mode === SCORECARD? typeClassName = "type": typeClassName = "hidden";
    mode === SCORECARD? nameColSize = 6: nameColSize = 4;
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    isOpen? objectiveClassName="objective white_bg": objectiveClassName="objective";
    
    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className={ objectiveClassName }>
            <Row className="top_row">
                <Col className="first_half" lg={ nameColSize }>
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
                        <Col className={ typeClassName }><span>objective</span></Col>
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className="status">Approved</Col>
                        <Col className="measure">{ measure_name }</Col>
                        <Col className="weight">{ weight && weight * 100 }</Col>
                        <Col className={ budgetClassName }>{ budget }</Col>
                        <Col className={ budgetClassName }>{ cost }</Col>
                        <Col>{ target && target * 100 }</Col>
                        <Col>{ score && score * 100 }</Col>
                        <Col><div className={ `perfomance ${status}`}></div></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={ initiativesClassName } >
                {
                    initiatives?.map(initiative => {
                        return <ViewInitiative key={ initiative.id } { ...initiative }/>
                    })
                }
            </Row>
        </Row>
    )
}

export default ViewObjective;
