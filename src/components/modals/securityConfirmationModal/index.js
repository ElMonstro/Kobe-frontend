import React from "react";
import { useFormik } from 'formik';
import {connect} from 'react-redux';
import { Modal, Form, Button } from "react-bootstrap";

import { yupLoginObj } from "../../../utils/validators";
import { setShowConfirmationModal } from "../../../redux/actions";

import "./index.scss";
import { notificationHandler } from "../../../utils/requestUtils";
import AuthService from "../../../services/authServices";


const SecurityConfirmationModal = props => {

    const { setShowConfirmationModal, showConfirmationModal, email, action } = props;
    
    const formik = useFormik({
            initialValues: {
            email: email,
            password: '',
            },
            validationSchema: yupLoginObj,
            onSubmit: async (values) => {
                console.log(values)
                const response = await AuthService.loginUser(values);
                console.log(response)
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
                    <Form.Group className="email_group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            value={email}
                            type="email" 
                            placeholder="username@company.com" 
                            { ...formik.getFieldProps('email') } 
                            isInvalid={ formik.touched.email && formik.errors.email }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.email }
                        </Form.Control.Feedback>
                    </Form.Group>
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
