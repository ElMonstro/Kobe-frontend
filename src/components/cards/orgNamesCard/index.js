import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

import "./index.scss";


const DivisionNamesForm = props => {
    return (
        <Card className="admin_card org_names_card">
            <div className="card_title">Define Organization Names Aliases</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Row>
                        <Col><Form.Label>Division</Form.Label></Col>
                        
                        <Col><Form.Control type="text" placeholder="Alias" /> </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Row>
                        <Col><Form.Label>Department</Form.Label></Col>
                        
                        <Col><Form.Control type="text" placeholder="Alias" /> </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Row>
                        <Col><Form.Label>Section</Form.Label></Col>
                        
                        <Col><Form.Control type="text" placeholder="Alias" /> </Col>
                    </Row>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default DivisionNamesForm;
