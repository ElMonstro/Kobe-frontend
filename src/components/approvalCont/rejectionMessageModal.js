import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";

import { useParams } from "react-router-dom";

import { fetchApprovalObject } from "../../services/urls";
import { PATCH } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import { yupRejectionForm } from "../../utils/validators";

const RejectionMessageModal = ({ showRejectionModal, setShowRejectionModal, closeApprovalModal }) => {

    const { approvalToken } = useParams();
    const handleClose = () => setShowRejectionModal(false);
    
    const reject = async values => {
        await makeRequest(fetchApprovalObject(approvalToken), PATCH, values, true, true);
        handleClose();
        closeApprovalModal();
    }

    const formik = useFormik({
        initialValues: {
        message: '',
        is_approved: false,
        },
        validationSchema: yupRejectionForm,
        onSubmit: reject
    });

    return (
            <Modal
                show={showRejectionModal}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="rejection_modal"
                contentClassName="rejection_model_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rejection Form</Modal.Title>
                </Modal.Header>
                <Modal.Body className="approval_modal_body">
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="message" controlId="message">
                            <Form.Label>Rejection Message</Form.Label>
                            <Form.Control 
                                type="text" 
                                as="textarea" 
                                rows={4} 
                                placeholder="Rejection reason(s)" 
                                { ...formik.getFieldProps('message') } 
                                isInvalid={ formik.touched.message && formik.errors.message }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.message }
                            </Form.Control.Feedback>
                        </Form.Group>
        
                        <Button className="submit_reject" variant="primary" type="">
                            Reject Update
                        </Button>
                    </Form>
                 
                </Modal.Body>
            </Modal>
    )
}

export default RejectionMessageModal
