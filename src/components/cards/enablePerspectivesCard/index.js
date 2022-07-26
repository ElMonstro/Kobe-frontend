import React from "react";
import { Form, Card, Col, Row } from "react-bootstrap";

import { makeRequest } from "../../../utils/requestUtils";
import { settingsURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";


const PesrpectiveSwitchForm = props => {

    const { setSettings, settings: { perspective_enabled } } = props; 

    const onChange = async event => {
        const data = {
            perspective_enabled: event.target.checked
        }

        const responseData = await makeRequest(settingsURL, POST, data, true);
        responseData && setSettings(responseData);

    }
    
    return (
        <Card className="admin_card side_label_form">
            <div className="card_title">Enable/Disable Perspectives</div>

            <Form>
                <Form.Group className="mb-3" controlId="perspective_enabled">
                    <Row>
                        <Col><Form.Label>Perspectives</Form.Label></Col>
                        
                        <Col><Form.Check
                         type="switch" placeholder="" 
                         onChange={ onChange }
                         checked={ perspective_enabled }
                         /> </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Card>
        
    );
};


export default PesrpectiveSwitchForm;
