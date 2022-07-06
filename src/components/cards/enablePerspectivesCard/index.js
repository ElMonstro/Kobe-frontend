import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

import "./index.scss";


const PesrpectiveSwitchForm = props => {
    return (
        <Card className="admin_card perspective_switch">
            <div className="card_title">Enable/Disable Perspectives</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Row>
                        <Col><Form.Label>Perspectives</Form.Label></Col>
                        
                        <Col><Form.Check type="switch" placeholder="" /> </Col>
                    </Row>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default PesrpectiveSwitchForm;
