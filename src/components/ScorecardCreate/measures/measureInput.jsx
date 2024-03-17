import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const MeasureInput = ({ formik, index }) => {

    const name = `measures.${index}.name`;
    const weight = `measures.${index}.weight`;
    const nameFieldProps = formik.getFieldProps(name);
    let touched = {}
    let errors = {};
    formik.touched?.measures? touched = formik.touched?.measures[index]: touched = {};
    formik.errors?.measures? errors = formik.errors?.measures[index]: errors = {};
        
    return (
        <Row className="inputs_row measure_inputs">
            <Col>
                <Form.Group className="mb-1" controlId={ name }>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...nameFieldProps } 
                    isInvalid={ touched.name && errors.name }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.name }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                <Form.Group className="mb-1" controlId={ weight }>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    value={ 100 }
                    { ...formik.getFieldProps(weight) } 
                    isInvalid={ touched.weight && errors.weight }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors?.weight }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
                
        );
}

export default MeasureInput;
