import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CREATE, SCORECARD } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, type, id})=> {

    const buttonMapper = {
        initiative: 'create',
        self_cascaded_init: 'create',
        objective: 'edit'
    }

    const navigate = useNavigate();

    const handleClick = e => {
        navigate(`/${SCORECARD}/${CREATE}/${e.target.id}`);
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
