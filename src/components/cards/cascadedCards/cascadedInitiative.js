import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CREATE, SCORECARD } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, type, id, is_created})=> {

    const buttonMapper = {
        false: 'create',
        true: 'edit'
    }
    const buttonType = buttonMapper[is_created];


    const navigate = useNavigate();

    const handleClick = e => {
        const url = `/${SCORECARD}/${CREATE}/${e.target.id}/${buttonType}`;
        navigate(url);
    };

    

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
