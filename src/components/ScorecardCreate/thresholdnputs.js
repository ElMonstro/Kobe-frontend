import React from "react";
import { Form, Row, Col } from "react-bootstrap"


const ThresholdInputs = ({ formik }) => {

    return (
        <Row className="inputs_row">
            <Col>
                <Form.Group className="mb-1" controlId="baseline">
                    <Form.Label>Baseline</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('baseline') } 
                    isInvalid={ formik.touched.baseline && formik.errors.baseline }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.baseline }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="target">
                    <Form.Label>Target</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('target') } 
                    isInvalid={ formik.touched.target && formik.errors.target }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.target }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        );
}

export default ThresholdInputs;
