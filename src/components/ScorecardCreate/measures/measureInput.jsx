import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MeasureInput = ({ formik, initiative, index }) => {

    const { measures } = initiative;
    const { mode } = useParams();
    const name = `measures.${index}.name`;
    const weight = `measures.${index}.weight`;
    const nameFieldProps = formik.getFieldProps(name);

    if (mode === "edit" && measures.length === 0) {
        const { name } = measures[0];
        nameFieldProps.value = name;
    };
    
    return (
        <Row className="inputs_row measure_inputs">
            <Col>
                <Form.Group className="mb-1" controlId={ name }>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...nameFieldProps } 
                    isInvalid={ formik.touched[name] && formik.errors[name] }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[name] }
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
                    isInvalid={ formik.touched[weight] && formik.errors[weight] }
                    disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[weight] }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
                
        );
}

export default MeasureInput;
