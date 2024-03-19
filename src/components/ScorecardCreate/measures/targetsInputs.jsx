import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { PERCENTAGE, UNITS } from "../../../utils/constants";


const TargetInputs = ({ formik, targetDisabled }) => {

    const dataTypeProps = formik.getFieldProps('data_type');
    const percentageTargetProps = formik.getFieldProps('percentage_target')
    const { mode } = useParams();

    return (
        <>
            <div className="title">
                Targets
            </div>
            <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-1" controlId="data_type">
                        <Form.Label>Data Type</Form.Label>
                        <Form.Select 
                            type="text" 
                            placeholder=""
                            { ...dataTypeProps } 
                            isInvalid={ formik.touched.data_type && formik.errors.data_type }
                            disabled={ mode }
                        >
                            <option>Enter Data Type</option>
                            <option value={ PERCENTAGE }>Percentage</option>
                            <option value={ UNITS }>Units</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.data_type }
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Col>
                <Col>
                    <Form.Group className="mb-1" controlId="percentage_target">
                        <Form.Label>Target (%)</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...percentageTargetProps } 
                        isInvalid={ formik.touched.percentage_target && formik.errors.percentage_target }
                        disabled={ targetDisabled }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.percentage_target }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </>
        );
}

export default TargetInputs;
