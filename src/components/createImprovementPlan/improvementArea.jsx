import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { X } from "styled-icons/bootstrap";

const ImprovementInput = ({ formik, index, arrayHelpers }) => {

    const improvementArea = `improvement_areas.${index}.improvement_area`;
    const improvementActivity = `improvement_areas.${index}.improvement_activity`;
    const timeline = `improvement_areas.${index}.timeline`;
    let touched = {}
    let errors = {};
    formik.touched?.improvement_areas? touched = formik.touched?.improvement_areas[index]: touched = {};
    formik.errors?.improvement_areas? errors = formik.errors?.improvement_areas[index]: errors = {};

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
                    isInvalid={ touched.improvement_area && errors.improvement_area }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.improvement_area }
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
                        isInvalid={ touched.improvement_activity  && errors.improvement_activity }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.improvement_activity }
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
                        isInvalid={ touched.timeline && errors.timeline }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.timeline }
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