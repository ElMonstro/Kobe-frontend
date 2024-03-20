import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from 'formik';

import "./index.scss";


const CompanyForm = ({ initialValues,  enableReinitialize, validationSchema, onSubmit}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize,
        onSubmit,
    });
    
    return (
        <div className="company_form">

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        { ...formik.getFieldProps('name') } 
                        isInvalid={ formik.touched.name && formik.errors.name }
                    /> 
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.name }
                    </Form.Control.Feedback>    
                </Form.Group>
                <Form.Group className="mb-3" controlId="email_domain">        
                    <Form.Label>Email Domain</Form.Label>      
                    <Form.Control 
                        type="text" 
                        placeholder="icsc.co.ke" 
                        { ...formik.getFieldProps('email_domain') } 
                        isInvalid={ formik.touched.email_domain && formik.errors.email_domain }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.email_domain }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="rest_server">  
                    <Form.Label>Rest Server</Form.Label>         
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        { ...formik.getFieldProps('rest_server') } 
                        isInvalid={ formik.touched.rest_server && formik.errors.rest_server }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.rest_server }
                    </Form.Control.Feedback>
                        
                </Form.Group>
                <Form.Group className="mb-3" controlId="grpc_server">
                    
                    <Form.Label>GRPC Server</Form.Label>      
                    
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        { ...formik.getFieldProps('grpc_server') } 
                        isInvalid={ formik.touched.grpc_server && formik.errors.grpc_server }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.grpc_server }
                    </Form.Control.Feedback>
                    
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </div>
        
    );
};


export default CompanyForm;
