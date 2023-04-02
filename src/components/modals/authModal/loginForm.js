import React from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import { Form, Button } from "react-bootstrap";

import { yupLoginObj } from "../../../utils/validators";
import AuthService from "../../../services/authServices";
import { changeLoginStatus } from "../../../redux/actions";

import "./index.scss";
import { parseJwt } from "../../../utils";
import { RESET_REQUEST, SCORECARD } from "../../../utils/constants";

const LoginForm = ({ changeLoginStatus, setCurrentForm } ) => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },
        validationSchema: yupLoginObj,
        onSubmit: async (values) => {
            const response = await AuthService.loginUser(values);

            if (response) {
                const user = parseJwt(response?.data.access);
                delete user.iat;
                delete user.jti;
                delete user.token_type;
                delete user.exp;
                
                changeLoginStatus(true);
                let url;
                user.is_admin? url = '/admin': url = `/${user.role}/${SCORECARD}`
                navigate(url);
                // store access tokens in local storage
                window.localStorage.setItem('tokens', JSON.stringify(response.data));
                window.localStorage.setItem('user', JSON.stringify(user));
            } 
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
    changeLoginStatus,
}

const mapStateToProps = ({ authReducer }) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (LoginForm);