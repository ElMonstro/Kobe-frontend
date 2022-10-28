import React from "react";
import { Form, Row, Col } from "react-bootstrap";


const BudgetInputs = ({ formik }) => {

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
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.budget }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                
            </Col>
        </Row>
        );
}

export default BudgetInputs;
