import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { PERCENTAGE, UNITS } from "../../utils/constants";


const BaselineTargetInputs = ({ formik, targetDisabled }) => {

    const baselineTypeProps = formik.getFieldProps('baseline');
    const targetFieldProps = formik.getFieldProps('units_target')

    return (
        <Row className="inputs_row">
            <Col>
                <Form.Group className="mb-1" controlId="baseline">
                    <Form.Label>Baseline</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...baselineTypeProps } 
                        isInvalid={ formik.touched.baseline && formik.errors.baseline }
                        disabled={ targetDisabled }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.baseline }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId="units_target">
                    <Form.Label>Target</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...targetFieldProps } 
                    isInvalid={ formik.touched.units_target && formik.errors.units_target }
                    disabled={ targetDisabled }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.units_target }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        );
}

export default BaselineTargetInputs;
