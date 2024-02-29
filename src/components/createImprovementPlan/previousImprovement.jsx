import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { makeRequest } from "../../utils/requestUtils";
import { PATCH } from "../../utils/constants";
import getURLs from "../../services/urls";


const PreviousImprovement = ({ improvement, checkBoxDisabled }) => {

    const handleChange = (event) => {
        const is_addressed = event.target.checked;
        makeRequest(getURLs().updateImprovementArea(improvement.id), PATCH, {is_addressed,}, true, true);
    }

    return (
        <Row className="improvement_row" id={ improvement.id }>
        <Col> 
            {improvement.improvement_area}
        </Col>      
        <Col>
            {improvement.improvement_activity}
        </Col>
        <Col>
            {improvement.timeline}
        </Col>
        <Col lg={2}>
            <Form.Check // prettier-ignore
                type="checkbox"
                className="address"
                label=""
                onChange={ handleChange }
                defaultChecked={improvement.is_addressed}
                disabled={ checkBoxDisabled }
            />
        </Col>
    </Row>
    );
}

export default PreviousImprovement;