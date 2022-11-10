import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import OpenCloseIcon from "../common/openCloseIcon";
import ViewInitiative from "../viewScorecard/viewInitiative";

const ViewAmendedObjective = ({ name, measures, weight, target, initiatives, budget }) => {

    const [isOpen, setIsOpen] = useState(false);
    const measure_name = measures && measures[0]?.name

    let initiativesClassName;
    let objectiveClassName;
    console.log(measures)

    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    isOpen? objectiveClassName="objective white_bg": objectiveClassName="objective";
    
    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className={ objectiveClassName }>
            <Row className="top_row">
                <Col className="first_half" lg={ 4 }>
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
                    </Row>
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className={ `measure`}>{ measure_name }</Col>
                        <Col className={ `weight`}>{ weight && weight * 100 }</Col>
                        <Col>{ budget }</Col>
                        <Col>{ target && target * 100 }</Col>
                        <Col>
                            <div className={ `period_targets`}>
                            </div>
                        </Col>
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

export default ViewAmendedObjective;
