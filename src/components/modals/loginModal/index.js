import React, { useState } from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import { Modal, Form, Button } from "react-bootstrap";

import { yupLoginObj } from "../../../utils/validators";
import AuthService from "../../../services/authServices";
import { changeLoginStatus } from "../../../redux/actions";

import "./index.scss";


const LoginModal = props => {

    const { isLoggedIn, changeLoginStatus } = props;
    const [show, setShow] = useState(Boolean(!isLoggedIn));
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loaderVisibility, changeLoaderVisibility] = useState('hidden');

    const formik = useFormik({
            initialValues: {
            email: '',
            password: '',
            },
            validationSchema: yupLoginObj,
            onSubmit: async (values) => {
                changeLoaderVisibility('visible');
                const response = await AuthService.loginUser(values, changeLoaderVisibility);
                changeLoginStatus(true);
                navigate('/admin');
                // store access tokens in local storage
                window.localStorage.setItem('tokens',JSON.stringify(response.data));
                changeLoaderVisibility('hidden');
    
            },
        });


    return (
        <div className="auth_modal">
            <Modal
                show={!isLoggedIn}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="auth_modal"
                contentClassName="auth_model_content"
                backdropClassName="modal_backdrop"
            >
                <div className="auth_title">Hi. Welcome!</div>
                <Modal.Body className="auth_modal_body">
            
                    <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="email_group" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
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
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            className="password_input" 
                            type="password" 
                            placeholder="Password" 
                            { ...formik.getFieldProps('password') } 
                            isInvalid={ formik.touched.password && formik.errors.password }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.password }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button className="login_btn" variant="primary" type="">
                        Login
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    changeLoginStatus
}

const mapStateToProps = ({authReducer}) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (LoginModal);

