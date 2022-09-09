import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { CREATE } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, type, id, setActiveComponent, setInitiativeId })=> {

    const buttonMapper = {
        initiative: 'create',
        self_cascaded_init: 'create',
        objective: 'edit'
    }

    const handleClick = e => {
        setInitiativeId(e.target.id);
        setActiveComponent(CREATE);
    };

    const buttonType = buttonMapper[type];

    return (
        <Row className="initiative">
            <Col lg={3}>
                { name }
            </Col>

            <Col lg={7}>
            
            </Col>
    
            <Col>
                <Button onClick={ handleClick } id={ id } className={ `action_btn ${buttonType}` }>
                    { buttonType }
                </Button>
            </Col>
        </Row>
    )
}

export default CascadedInitiative;
