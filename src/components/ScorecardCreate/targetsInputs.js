import React from "react";
import { Form, Row, Col } from "react-bootstrap"


const TargetInputs = ({ formik }) => {

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
                        { ...formik.getFieldProps('data_type') } 
                        isInvalid={ formik.touched.data_type && formik.errors.data_type }
                        >
                            <option value="percentage">Percentge</option>
                            <option value="units">Units</option>
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
                        { ...formik.getFieldProps('percentage_target') } 
                        isInvalid={ formik.touched.percentage_target && formik.errors.percentage_target }
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
