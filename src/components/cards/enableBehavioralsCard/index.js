import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

import "./index.scss";


const BehavioralSwitchForm = props => {
    return (
        <Card className="admin_card side_label_form">
            <div className="card_title">Enable/Disable Behavioral Perspectives</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Row>
                        <Col><Form.Label>Behavioral Perspectives</Form.Label></Col>
                        
                        <Col><Form.Check type="switch" placeholder="" /> </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Card>
        
    );
};


export default BehavioralSwitchForm;
