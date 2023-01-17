import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap"
import { useFormik } from 'formik';

import { yupPasswordObj } from "../../../utils/validators";
import { updatePasswordURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import { connect } from "react-redux";

const ProfileForm = ({ userRole }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: userRole?.user?.first_name,
            second_name: userRole?.user?.second_name,
            email: userRole?.user?.email,
            designation: userRole?.name,
            password: '',
            new_password: ''
        },
        validationSchema: yupPasswordObj,
        onSubmit: async (values) => {
            makeRequest(updatePasswordURL, POST, values, true)
                .then(data => {
                    if (data) {
                        const user = JSON.parse(localStorage.getItem('user'));
                        user.is_password_updated = true;
                        window.localStorage.setItem('user', JSON.stringify(user));
                    }
                });
        },
    });

    return (
        <div className="profile_form">
            <div className="profile_title">Edit your profile settings</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Row className="inputs_row">
                    <Col>
                        <Form.Group className="mb-3" controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps('first_name') } 
                                isInvalid={ false }
                                disabled
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.first_name }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="second_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps('second_name') }
                                isInvalid={ false }
                                disabled
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.second_name }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="inputs_row">
                    <Col>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps('email') } 
                                isInvalid={ false }
                                disabled
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.email }
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps('designation') } 
                                isInvalid={ false }
                                disabled
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.designation }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="inputs_row">
                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder=""
                                { ...formik.getFieldProps('password') } 
                                isInvalid={ formik.touched.password && formik.errors.password }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.password }
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="new_password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder=""
                                { ...formik.getFieldProps('new_password') } 
                                isInvalid={ formik.touched.new_password && formik.errors.new_password }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.new_password }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </div>
        
    );
};


const mapDispatchToProps = {
 
}

const mapStateToProps = ({ adminReducer: { orgChart } } ) => ({
    userRole: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ProfileForm);
