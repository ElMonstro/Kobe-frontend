import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import { DELETE } from "../../../utils/constants";


const CreatedMilestone = ({ deleteMilestone, description, percentage, id }) => {
    const onDeleteMilestone = e => {
        makeRequest(getURLs().deletemilestoneURL(id), DELETE,  null, true, true);
        deleteMilestone(id);
    };

    return (
        <Row className="inputs_row">
        <Col lg={4}>
            <Form.Group className="initiative_name">
                <Form.Control 
                type="text"
                defaultValue={ description }
                placeholder=""
                disabled
                />
            </Form.Group>
        </Col>
        <Col>
            
        </Col>
        <Col>
            <Form.Group >
                 <Form.Control
                    className="cascade"
                    type="text"
                    disabled 
                    defaultValue={ percentage }
                />
            
            </Form.Group>
        </Col>
        <Col className="delete_btn red">
            <span onClick={ onDeleteMilestone }><DeleteBin5 /></span>
        </Col>
    </Row>
    );
}

export default CreatedMilestone
