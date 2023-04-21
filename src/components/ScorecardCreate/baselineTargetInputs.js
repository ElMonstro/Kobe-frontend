import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { PERCENTAGE, UNITS } from "../../utils/constants";


const BaselineTargetInputs = ({ formik, targetDisabled }) => {

    const baselineTypeProps = formik.getFieldProps('baseline');
    const targetFieldProps = formik.getFieldProps('endline')

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
                <Form.Group className="mb-1" controlId="endline">
                    <Form.Label>Endline</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...targetFieldProps } 
                    isInvalid={ formik.touched.endline && formik.errors.endline }
                    disabled={ targetDisabled }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.endline }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
        );
}

export default BaselineTargetInputs;
