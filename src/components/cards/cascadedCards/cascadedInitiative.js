import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE, EDIT, INITIATIVE, SCORECARD } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, id, type})=> {

    let buttonType = EDIT

    if (type === INITIATIVE){
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
