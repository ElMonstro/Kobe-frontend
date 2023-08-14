import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";


const ImpactInputs = ({ formik }) => {

    return (            
        <div className="">
            <div className="title">Impact</div>
            <Row className={ `inputs_row` }>
                <Col>
                    <Form.Group className="mb-1" controlId="impact_baseline">
                        <Form.Label>Impact baseline</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('impact_baseline') }
                            isInvalid={ formik.touched.impact_baseline && formik.errors.impact_baseline }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.impact_baseline }
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Col>
                <Col>
                    <Form.Group className="mb-1" controlId="impact_target">
                        <Form.Label>Impact target</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('impact_target') }
                            isInvalid={ formik.touched.impact_target && formik.errors.impact_target }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.impact_target }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-1" controlId="impact_description">
                        <Form.Label>Impact Description</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('impact_description') }
                            isInvalid={ formik.touched.impact_description && formik.errors.impact_description }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.impact_description }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default ImpactInputs;
