import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

const MileStone = ({ formik, index, arrayHelpers }) => {

    const description = `milestones.${index}.description`;
    const percentage = `milestones.${index}.percentage`;
    let touched = {}
    let errors = {};
    formik.touched?.milestones? touched = formik.touched?.milestones[index]: touched = {};
    formik.errors?.milestones? errors = formik.errors?.milestones[index]: errors = {};

    const onDelete = () => {
        arrayHelpers.remove(index)
    };

    return (
        <Row className="inputs_row" id="milestone">
            <Col lg={4}>
                <Form.Group className="milestone" controlId={ description }>
                    <Form.Control 
                        type="text"
                        placeholder=""
                        { ...formik.getFieldProps(description) } 
                        isInvalid={ touched?.description && errors?.description }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors?.description }
                    </Form.Control.Feedback>
                </Form.Group>
                
            </Col>
            <Col>
            </Col>
            <Col>
                <Form.Group controlId={ percentage }>
                    {
                    <Form.Control
                        className="cascade"
                        type="text" 
                        { ...formik.getFieldProps(percentage) } 
                        isInvalid={ touched?.percentage && errors?.percentage }
                    />
                    }
                    <Form.Control.Feedback type='invalid'>
                        { errors?.percentage }
                    </Form.Control.Feedback>
                    
                </Form.Group>
            </Col>
            <Col className="delete_btn">
                {index > 0 &&
                    <span onClick={ onDelete }><DeleteBin5 /></span>
                }
            </Col>
        </Row>
    );
}

export default MileStone
