import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../../common/openCloseIcon";

import "./index.scss";
import ViewSidebarInitiative from "./viewSidebarInitiative";
import objectiveIcon from "../../../assets/objective.svg";


const ViewSidebarObjective = ({ name, initiatives }) => {

    const [isOpen, setIsOpen] = useState(false);

    let initiativesClassName;
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    
    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className="sidebar_objective">
            <Row className="top_row">
                <Col>
                    <img className="icon" src={ objectiveIcon } alt="icon" />
                    <span className="name" 
                        onClick={ handleClick }>
                        { name }
                    </span>
                    <OpenCloseIcon 
                        handleclick={ handleClick } 
                        defaultMode={ isOpen }
                        icon="caret"
                    />
                </Col>
            </Row>
            <Row className={ initiativesClassName } >
                {
                    initiatives?.map(initiative => {
                        return <ViewSidebarInitiative key={ initiative.id } { ...initiative }/>
                    })
                }
            </Row>
        </Row>
    )
}

export default ViewSidebarObjective;
