import React from "react";
import { useFormik } from 'formik';
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { yupResetPasswordObj } from "../../../utils/validators";
import "./index.scss";
import { EMAIL_CAPTURE, PATCH } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";

const PasswordResetForm = ( { setCurrentForm } ) => {
    const { resetToken } = useParams();
    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_password: ''
        },
        validationSchema: yupResetPasswordObj,
        onSubmit: async (values) => {
            makeRequest(getURLs().resetPasswordURL(resetToken), PATCH, values, false, true).then( data => {
                data && setCurrentForm(EMAIL_CAPTURE);
            })
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
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
            <Form.Group className="mb-3 password_group" controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    className="password_input" 
                    type="password" 
                    placeholder="Confirm Password" 
                    { ...formik.getFieldProps('confirm_password') } 
                    isInvalid={ formik.touched.confirm_password && formik.errors.confirm_password }
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors.confirm_password }
                </Form.Control.Feedback> 
            </Form.Group>
            <span onClick={ () => setCurrentForm(EMAIL_CAPTURE)} className="auth_help_text">
                    Login? Click here.
            </span>
            
            <Button className="login_btn" variant="primary" type="">
                Reset Password
            </Button>
        </Form>
    )
}

export default PasswordResetForm;
