import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

import "./index.scss";


const MissionVisionForm = props => {
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Add organization Mission and Vision</div>

            <Form>
                <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Mission</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Vision</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                </Col>
                </Row>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </Card>
        
    );
};


export default MissionVisionForm;




