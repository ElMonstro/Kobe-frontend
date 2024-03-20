import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { APPROVAL_MAPPER } from "../../utils/constants";

import OpenCloseIcon from "../common/openCloseIcon";
import "./index.scss";
import ViewInitiative from "./viewInitiative";

const ViewObjective = ({ 
    name, measures, weight, data_type, units_target, percentage_target, 
    percentage_score, status, initiatives, change_approval_trackers, percentage_progress
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const measure_name = measures[0]?.name
    let initiativesClassName;
    let objectiveClassName;
    const approval_status = APPROVAL_MAPPER[change_approval_trackers[0]?.is_approved];
    const score_display_mapper = {
        units: [units_target, ""],
        percentage: [percentage_target, "%"]
    }
    const [target, symbol] = score_display_mapper[data_type];
    
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    isOpen? objectiveClassName="objective white_bg": objectiveClassName="objective";
    weight = parseInt(weight)

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
                        <Col className={`status ${approval_status}`}>{ approval_status }</Col>
                        <Col className="measure">{ measure_name }</Col>
                        <Col className="weight">{ weight }</Col>
                        <Col>{ target }{ symbol }</Col>
                        <Col className={ `score ${status}_color` }>{ percentage_progress }</Col>
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
