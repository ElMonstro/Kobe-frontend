import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

import OpenCloseIcon from "../common/openCloseIcon";
import ViewInitiative from "../viewScorecard/viewInitiative";

const ViewAmendedObjective = ({ name, measures, weight, target, initiatives, budget, period_targets }) => {
    console.log(period_targets)

    const [isOpen, setIsOpen] = useState(false);
    const measure_name = measures && measures[0]?.name

    let initiativesClassName;
    let objectiveClassName;

    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    isOpen? objectiveClassName="objective white_bg": objectiveClassName="objective";

    const PeriodTarget = ({ period, target }) => {
            return <div>
                        <span className="period">{ period }</span> 
                        <span className="target">{ target }</span>
                    </div>
        }
    
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
                        <Col className={ `weight`}>{ weight }</Col>
                        <Col>{ budget }</Col>
                        <Col>{ target }</Col>
                        <Col>
                            <div className="period_targets">
                                {
                                    period_targets?.map(period_target => {
                                        return <div>
                                        <span className="period">{ period_target.period }:</span> 
                                        <span className="target">{ period_target.target}</span>
                                    </div>
                                    })
                                }
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
