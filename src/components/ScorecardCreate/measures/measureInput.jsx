import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { PERCENTAGE, UNITS } from "../../../utils/constants";
import QuaterlyTargetInputs from "./quaterlyTargetsInputs";
import BaselineTargetInputs from "./baselineTargetInputs";
import TargetInputs from "./targetsInputs";


const MeasureInput = ({ formik, measureId, weightId, initiative, setReinitializeForm }) => {

    const dataType = formik.getFieldProps('data_type').value;
    const { measures } = initiative;
    const { mode } = useParams();
    const nameFieldProps = formik.getFieldProps(measureId)

    
    useEffect(() => {
        const resetUnitTargets = () => {
            formik.setFieldValue('units_target', 0);
            formik.setFieldValue('baseline', 0)
        }
        dataType === UNITS? formik.setFieldValue('percentage_target', 0): resetUnitTargets();

    }, [dataType])

    if (mode === "edit" && measures === []) {
        const { name } = measures[0];
        nameFieldProps.value = name;
    }
    
    return (
        <>
            <Row className="inputs_row measure_inputs">
                <Col>
                    <Form.Group className="mb-1" controlId={ measureId }>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...nameFieldProps } 
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
            
            <TargetInputs formik={ formik }  targetDisabled={ dataType!==PERCENTAGE } initiative={ initiative } setReinitializeForm={setReinitializeForm}/>
            <BaselineTargetInputs targetDisabled={ dataType!==UNITS} formik={ formik } initiative={ initiative }/>
            <QuaterlyTargetInputs formik={ formik } />
        </>
                
        );
}

export default MeasureInput;
