import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import OpenCloseIcon from "../../common/openCloseIcon";
import { useNavigate } from "react-router-dom";


import "./index.scss";
import ViewSidebarObjective from "./viewSidebarObjective";
import perspectiveIcon from "../../../assets/perspective.svg";
import { PERSPECTIVES } from "../../../utils/constants";


const ViewSidebarPerspective = ({ objectives, alias, id}) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    let objectivesClassName;
    isOpen? objectivesClassName="objectives": objectivesClassName="hidden";

    const handleClick = e => {
        setIsOpen(!isOpen);
    }

    return (
        <Row className="sidebar_perspective">
            <Row>
                <Col>
                    <img onClick={ () => navigate(`${PERSPECTIVES}/${id}`) } className="icon" src={ perspectiveIcon } alt="icon" />
                    <span onClick={ () => navigate(`${PERSPECTIVES}/${id}`) } className="perspective_name name">{ alias }</span>
                    <OpenCloseIcon 
                        handleclick={ handleClick } 
                        defaultMode={ isOpen }
                        icon="caret"
                    />
                </Col>
            </Row>
            <Row className={ objectivesClassName }>
                {
                    objectives.map(objective => {
                        return <ViewSidebarObjective key={ objective.id } { ...objective } />
                    })
                }
            </Row>    
        </Row>
    )
}

export default ViewSidebarPerspective;
