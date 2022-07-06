import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

import "./index.scss";


const ThresholdsForm = props => {
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Thresholds</div>

            <Form>
                <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Upper</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Lower</Form.Label>
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


export default ThresholdsForm;
