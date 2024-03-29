import React from "react";
import { useFormik } from 'formik';
import {connect} from 'react-redux';
import { Modal, Form, Button } from "react-bootstrap";

import { setShowConfirmationModal } from "../../../redux/actions";

import "./index.scss";
import { notificationHandler } from "../../../utils/requestUtils";
import AuthService from "../../../services/authServices";


const SecurityConfirmationModal = ({ setShowConfirmationModal, showConfirmationModal, email, action }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const formik = useFormik({
            initialValues: {
            password: '',
            },
            onSubmit: async (values) => {
                values.email = user.email;
                const response = await AuthService.loginUser(values);
                notificationHandler(response, "Confirmation Successful", "Wrong password");
                response?.status === 200 && await action();
                response?.status === 200 && setShowConfirmationModal(false);             
            },
        });

        const handleClose = () => {
            setShowConfirmationModal(false); 
        }

    return (
        <div className="auth_modal">
            <Modal
                show={showConfirmationModal}
                onHide={handleClose}
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                
                dialogClassName="conf_modal auth_modal"
                contentClassName="auth_model_content"
                backdropClassName="modal_backdrop"
            >   
                <Modal.Header closeButton>
                    <div className="header_title">Security Confirmation</div>
                </Modal.Header>
                
                <Modal.Body className="auth_modal_body">
            
                    <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 password_group" controlId="password">
                        <Form.Label>Enter your Password</Form.Label>
                        <Form.Control 
                            className="password_input" 
                            type="password" 
                            placeholder="Password" 
                            autoComplete="off"
                            { ...formik.getFieldProps('password') } 
                            isInvalid={ formik.touched.password && formik.errors.password }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.password }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="conf_btn confirm_btn" variant="primary" type="">
                        Confirm Action
                    </Button>
             
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    setShowConfirmationModal
}

const mapStateToProps = ({ authReducer: user, authReducer }) => ({
    ...user, 
    showConfirmationModal: authReducer?.showConfirmationModal
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (SecurityConfirmationModal);
