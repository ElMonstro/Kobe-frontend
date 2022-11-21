import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE, EDIT, SCORECARD } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, id, percentage_target, units_target})=> {


    let buttonType = EDIT

    if (percentage_target === 0 && units_target === 0){
        buttonType = CREATE;
    }
    const navigate = useNavigate();
    const { role } = useParams();

    const handleClick = e => {
        const url = `/${role}/${SCORECARD}/${CREATE}/${e.target.id}/${buttonType}`;
        navigate(url);
    };

    return (
        <Row className="initiative">
            <Col lg={4}>
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
