import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

const MileStone = ({ formik, milestoneId, deleteMilestone, percentageId, deleteId }) => {


    const onDeleteMilestone = e => {
        const deleteId = e.target.parentElement.parentElement.id;
        deleteId && deleteMilestone(deleteId);

    }

    return (
        <Row className="inputs_row" id={ milestoneId }>
        <Col lg={4}>
            <Form.Group className="milestone" controlId={ milestoneId }>
                <Form.Control 
                    type="text"
                    placeholder=""
                    { ...formik.getFieldProps(milestoneId) } 
                    isInvalid={ formik.touched[milestoneId] && formik.errors[milestoneId] }
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[milestoneId] }
                </Form.Control.Feedback>
            </Form.Group>
            
        </Col>
        <Col>
        
        </Col>
        <Col>
            <Form.Group controlId={ percentageId }>
                {
                 <Form.Control
                    className="cascade"
                    type="text" 
                    { ...formik.getFieldProps(percentageId) } 
                    isInvalid={ formik.touched[percentageId] && formik.errors[percentageId] }
                />
                }
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[percentageId] }
                </Form.Control.Feedback>
                
            </Form.Group>
        </Col>
        <Col className="delete_btn">
            <span id={ deleteId } onClick={ onDeleteMilestone }><DeleteBin5 /></span>
        </Col>
    </Row>
    );
}

export default MileStone
