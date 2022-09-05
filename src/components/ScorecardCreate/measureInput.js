import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap"


const MeasureInput = ({ formik, measureId, weightId }) => {
    
    return (
            <Row className="inputs_row measure_inputs">
                <Col>
                    <Form.Group className="mb-1" controlId={ measureId }>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...formik.getFieldProps(measureId) } 
                        isInvalid={ formik.touched[measureId] && formik.errors[measureId] }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors[measureId] }
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Col>
                <Col>
                    <Form.Group className="mb-1" controlId={ weightId }>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...formik.getFieldProps(weightId) } 
                        isInvalid={ formik.touched[weightId] && formik.errors[weightId] }
                        disabled
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors[weightId] }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>    
        );
}

export default MeasureInput;
