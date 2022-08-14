import React from "react";
import { Form, Card, Col, Row } from "react-bootstrap";

import { makeRequest } from "../../../utils/requestUtils";
import { settingsURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";


const AppraisalSettingsCard = props => {

    const { setSettings, settings: { perspectives_report_enabled, objectives_report_enabled, initiatives_report_enabled} } = props; 

    const onChange = async event => {
        const data = {};
        data[event.target.id] = event.target.checked;
        const responseData = await makeRequest(settingsURL, POST, data, true);
        responseData && setSettings(responseData);

    }

    return (
        <Card className="admin_card side_label_form">
            <div className="card_title">Enable/Disable Appraisal Report Sections</div>

            <Form>
                <Form.Group controlId="perspectives_report_enabled">
                    <Row>
                        <Col>
                            <Form.Label> Perspectives </Form.Label>
                        </Col>
                        
                        <Col>
                            <Form.Check 
                                key=""
                                type="switch" 
                                placeholder=""
                                onChange={ onChange }
                                checked={ Boolean(perspectives_report_enabled) } 
                            /> 
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="objectives_report_enabled">
                    <Row>
                        <Col>
                            <Form.Label> Objectives </Form.Label>
                        </Col>
                        
                        <Col>
                            <Form.Check 
                                type="switch" 
                                placeholder=""
                                onChange={ onChange }
                                checked={ Boolean(objectives_report_enabled) } 
                            /> 
                        </Col>
                    </Row>
                    
                </Form.Group>
                <Form.Group controlId="initiatives_report_enabled">
                    <Row>
                        <Col>
                            <Form.Label> Initiatives </Form.Label>
                        </Col>
                        
                        <Col>
                            <Form.Check 
                                type="switch" 
                                placeholder=""
                                onChange={ onChange }
                                checked={ Boolean(initiatives_report_enabled) } 
                            /> 
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Card>
        
    );
};


export default AppraisalSettingsCard;
