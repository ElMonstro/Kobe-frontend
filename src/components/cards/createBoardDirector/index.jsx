import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupCreateUserObj } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { useParams } from "react-router-dom";


const CreateUserForm = ({ se }) => {

    const { companyId } = useParams();

    const formik = useFormik({
        initialValues: {
            first_name: '',
            second_name: '',
            email: '',
        },
        validationSchema: yupCreateUserObj,
        enableReinitialize: false,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminCreateCompanyUser(companyId), PATCH, values, true);
        },
    });
    
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Create User</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="first_name">
                    <Row>
                        <Col><Form.Label>First Name</Form.Label></Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('first_name') } 
                                isInvalid={ formik.touched.first_name && formik.errors.first_name }
                            /> 
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.first_name }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="second_name">
                    <Row>
                        <Col><Form.Label>Second Name</Form.Label></Col> 
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('second_name') } 
                                isInvalid={ formik.touched.second_name && formik.errors.second_name }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.second_name }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Row>
                        <Col><Form.Label>Email</Form.Label></Col>      
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('email') } 
                                isInvalid={ formik.touched.email && formik.errors.email }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.email }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </Card>
        
    );
};


export default CreateUserForm;
