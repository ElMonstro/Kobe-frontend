import React from "react";
import { Form, Row, Col } from "react-bootstrap";


const BudgetInputs = ({ formik, actingRole, initiative }) => {
    return (
        <Row className="inputs_row">
            <Col>
                <Form.Group className="mb-1" controlId="budget">
                    <Form.Label>Budget</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('budget') } 
                    isInvalid={ formik.touched.budget && formik.errors.budget }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.budget }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="evidence_description">
                    <Form.Label>Evidence Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('evidence_description') } 
                    isInvalid={ formik.touched.evidence_description && formik.errors.evidence_description }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.evidence_description }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
        </Row>
        );
}

export default BudgetInputs;
