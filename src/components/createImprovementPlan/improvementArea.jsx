import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { X } from "styled-icons/bootstrap";

const ImprovementInput = ({ formik, index, arrayHelpers }) => {

    const improvementArea = `improvement_areas.${index}.improvement_area`;
    const improvementActivity = `improvement_areas.${index}.improvement_activity`;
    const timeline = `improvement_areas.${index}.timeline`;

    const onDelete = () => {
        arrayHelpers.remove(index);
    };

    return (
        <Row className="improvement_row" id={ index }>
            <Col>
                <Form.Group className="" controlId={ improvementArea }>
                    <Form.Control 
                    type="text"
                    valuedefault="" 
                    placeholder=""
                    { ...formik.getFieldProps(improvementArea) } 
                    isInvalid={ formik.touched[improvementArea] && formik.errors[improvementArea] }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[improvementArea] }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
                <Form.Group controlId={ improvementActivity }>
                    <Form.Control 
                        className="" 
                        type="text" 
                        as="textarea"
                        placeholder=""
                        valuedefault=""
                        { ...formik.getFieldProps(improvementActivity) } 
                        isInvalid={ formik.touched[improvementActivity] && formik.errors[improvementActivity] }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[improvementActivity] }
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId={ timeline }>
                    <Form.Control 
                        className="" 
                        type="text" 
                        placeholder="2 weeks"
                        valuedefault=""
                        { ...formik.getFieldProps(timeline) } 
                        isInvalid={ formik.touched[timeline] && formik.errors[timeline] }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[timeline] }
                    </Form.Control.Feedback>
                    
                </Form.Group>
            </Col>
            <Col lg={1}>
                { index > 0 && 
                    <span className="icon dlt_btn" onClick={ onDelete }>
                        <X />
                    </span>
                }
            </Col>
        </Row>
    );
}

export default ImprovementInput;