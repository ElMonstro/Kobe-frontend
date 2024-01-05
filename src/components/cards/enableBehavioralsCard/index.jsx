import React from "react";
import { Form, Card, Col, Row } from "react-bootstrap";

import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import "./index.scss";
import { useParams } from "react-router-dom";


const BehavioralSwitchForm = props => {

    const { setSettings, settings: { behaviorals_enabled } } = props; 
    const { companyId } = useParams();

    const onChange = async event => {
        const data = {
            behaviorals_enabled: event.target.checked
        }

        const responseData = await makeRequest(getURLs().adminSettingsURL(companyId), PATCH, data, true);
        responseData && setSettings(responseData);

    }

    return (
        <Card className="admin_card side_label_form">
            <div className="card_title">Enable/Disable Behavioral Perspectives</div>

            <Form>
                <Form.Group className="mb-3" controlId="behaviorals_enabled">
                    <Row>
                        <Col><Form.Label>Behavioral Perspectives</Form.Label></Col>
                        
                        <Col><Form.Check 
                        type="switch" 
                        placeholder=""
                        onChange={ onChange }
                        checked={ Boolean(behaviorals_enabled) } 
                        /> 
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Card>
        
    );
};


export default BehavioralSwitchForm;
