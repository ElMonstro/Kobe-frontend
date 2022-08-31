import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap"


const ObjectiveInputs = ({ formik }) => {

    return (
        <Card className="staff_card">
            <div className="card_title title">Objective</div>
            <div className="inputs_cont">
                <Row className="inputs_row">
                    <Col>
                        <Form.Group className="mb-1" controlId="name">
                            <Form.Label>Objective</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('name') } 
                            isInvalid={ formik.touched.name && formik.errors.name }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.name }
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                    </Col>
                    <Col>
                        <Form.Group className="mb-1" controlId="perspective">
                            <Form.Label>Perspective</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('perspective') } 
                            isInvalid={ formik.touched.perspective && formik.errors.perspective }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.perspective }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
    </Card>
    );
}

export default ObjectiveInputs;
