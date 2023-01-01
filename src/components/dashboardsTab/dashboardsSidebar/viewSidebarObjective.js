import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../../common/openCloseIcon";

import "./index.scss";
import ViewSidebarInitiative from "./viewSidebarInitiative";
import objectiveIcon from "../../../assets/objective.svg";
import { useNavigate } from "react-router-dom";
import { OBJECTIVES } from "../../../utils/constants";


const ViewSidebarObjective = ({ name, initiatives, id }) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let initiativesClassName;
    isOpen? initiativesClassName="initiatives": initiativesClassName="hidden";
    
    const handleClick = e => {
        setIsOpen(!isOpen);
    } 

    return (
        <Row className="sidebar_objective">
            <Row className="top_row">
                <Col>
                    <img onClick={ () => navigate(`${OBJECTIVES}/${id}`) } className="icon" src={ objectiveIcon } alt="icon" />
                    <span onClick={ () => navigate(`${OBJECTIVES}/${id}`) } className="name">
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
