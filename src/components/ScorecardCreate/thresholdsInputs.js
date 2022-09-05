import React from "react";
import { Form, Row, Col } from "react-bootstrap"


const BaselineTargetInputs = ({ formik }) => {

    return (
        <Row className="inputs_row">
            <Col>
                <Form.Group className="mb-1" controlId="upper_threshold">
                    <Form.Label>Lower Threshold</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('upper_threshold') } 
                    isInvalid={ formik.touched.upper_threshold && formik.errors.upper_threshold }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.upper_threshold }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="lower_threshold">
                    <Form.Label>Upper Threshold</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps('lower_threshold') } 
                    isInvalid={ formik.touched.lower_threshold && formik.errors.lower_threshold }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.lower_threshold }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        );
}

export default BaselineTargetInputs;
