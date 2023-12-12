import React from "react";
import { useFormik } from 'formik';
import { Form, Button } from "react-bootstrap";

import { yupPasswordRequestObj } from "../../../utils/validators";
import "./index.scss";
import { EMAIL_CAPTURE, POST } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";

const ResetRequestForm = ( { setCurrentForm } ) => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yupPasswordRequestObj,
        onSubmit: async (values) => {
            const data = await makeRequest(getURLs().resetPasswordRequestURL, POST, values, false, true);
            console.log(data)

        },
    });

    return (
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
            <span onClick={ () => setCurrentForm(EMAIL_CAPTURE)} className="auth_help_text">
                    Login? Click here.
            </span>
            
            <Button className="login_btn" variant="primary" type="">
                Send Link
            </Button>
        </Form>
    )
}

export default ResetRequestForm;
