import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

import { PERCENTAGE, UNITS } from "../../utils/constants";
import QuaterlyTargetInputs from "./quaterlyTargetsInputs";
import BaselineTargetInputs from "./baselineTargetInputs";
import TargetInputs from "./targetsInputs";


const MeasureInput = ({ formik, measureId, weightId }) => {

    const dataType = formik.getFieldProps('data_type').value;
    
    return (
        <>
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
                        value={ 100 }
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
            
            <TargetInputs formik={ formik }  targetDisabled={ dataType!==PERCENTAGE }/>
            <BaselineTargetInputs targetDisabled={ dataType!==UNITS} formik={ formik } />
            <QuaterlyTargetInputs formik={ formik }/>
        </>
                
        );
}

export default MeasureInput;
