import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

const MileStone = ({ formik, index, arrayHelpers }) => {

    const description = `milestones.${index}.description`;
    const percentage = `milestones.${index}.percentage`;

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
                        isInvalid={ formik.touched[description] && formik.errors[description] }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[description] }
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
                        isInvalid={ formik.touched[percentage] && formik.errors[percentage] }
                    />
                    }
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors[percentage] }
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
