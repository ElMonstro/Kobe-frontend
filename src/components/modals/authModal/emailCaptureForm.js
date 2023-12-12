import React from "react";
import { useFormik } from 'formik';
import {connect} from 'react-redux';
import { Form, Button } from "react-bootstrap";

import { yupEmailObj } from "../../../utils/validators";
import { setAuthEmail } from "../../../redux/actions";

import "./index.scss";
import { GET, RESET_REQUEST } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import resolve_base_url from "../../../services/baseURL";

const EmailCaptureForm = ({ setCurrentForm, setAuthEmail } ) => {

    const formik = useFormik({
        initialValues: {
        email: '',
        },
        validationSchema: yupEmailObj,
        onSubmit: async (values) => {
            const domain = values.email.split('@')[1];
            setAuthEmail(values.email);
            var baseURL = resolve_base_url();
            makeRequest(getURLs().fetchAuthURL(domain), GET, null, false, false)
                .then(data => {
                    if (data) {
                        baseURL = data.url;
                    }
                    window.localStorage.setItem('baseURL', baseURL);
                });
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
            <span onClick={() => setCurrentForm(RESET_REQUEST)} className="auth_help_text">
                    Forgot Password? Click here.
            </span>
            <Button className="login_btn" variant="primary" type="">
                Login
            </Button>
        </Form>
    )
}

const mapDispatchToProps = {
    setAuthEmail
}

const mapStateToProps = ({ authReducer }) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (EmailCaptureForm);
