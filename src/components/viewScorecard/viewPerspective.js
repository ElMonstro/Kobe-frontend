import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { SCORECARD } from "../../utils/constants";
import OpenCloseIcon from "../common/openCloseIcon";


import "./index.scss";
import ViewObjective from "./viewObjective";

const ViewPerspective = ({ objectives, alias, score, status}) => {

    const [isOpen, setIsOpen] = useState(false);

    let objectivesClassName;
    let perspectiveClassName;
    isOpen? objectivesClassName="objectives gray_lines": objectivesClassName="hidden";
    isOpen? perspectiveClassName="perspective white_bg": perspectiveClassName="perspective";

    const handleClick = e => {
        setIsOpen(!isOpen);
    }

    return (
        <Row className={ perspectiveClassName }>
            <Row>
                <Col className="">
                    <Row>
                    <Col lg="8">
                        <Row>
                            <Col onClick={ handleClick }>
                                <OpenCloseIcon 
                                    handleclick={ handleClick } 
                                    defaultMode={ isOpen } 
                                    />
                                    <span className="name">{ alias }</span>
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
                        <Col></Col>
                        <Col className={ `score ${status}_color` }>{ score * 100 }</Col>
                    </Row>
                </Col>
            </Row>
            <Row className={ objectivesClassName }>
                {
                    objectives.map(objective => {
                        return <ViewObjective key={ objective.id } mode={ SCORECARD } { ...objective } />
                    })
                }
            </Row>
        
        
            
        </Row>
    )
}

export default ViewPerspective;
