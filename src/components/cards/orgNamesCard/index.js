import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupDivisionNamesObj } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import { POST } from "../../../utils/constants";

import "./index.scss";
import { useParams } from "react-router-dom";



const DivisionNamesForm = ({ settings }) => {
    const { companyId } = useParams();
    const formik = useFormik({
        initialValues: {
            division_name: settings.division_name,
            department_name: settings.department_name,
            section_name: settings.section_name,
        },
        validationSchema: yupDivisionNamesObj,
        enableReinitialize: true,
        onSubmit: async (values) => {
            for (const key of Object.keys(values)) {
                if (!values[key]) {
                    delete values[key]
                }
            }
            makeRequest(getURLs().adminSettingsURL(companyId), POST, values, true);
        },
    });

    return (
        <Card className="admin_card org_names_card">
            <div className="card_title">Define Organization Names Aliases</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="division_name">
                    <Row>
                        <Col><Form.Label>Division</Form.Label></Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Division Alias" 
                                { ...formik.getFieldProps('division_name') } 
                                isInvalid={ formik.touched.division_name && formik.errors.division_name }
                            /> 
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.division_name }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="department">
                    <Row>
                        <Col><Form.Label>Department</Form.Label></Col> 
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Department Alias" 
                                { ...formik.getFieldProps('department_name') } 
                                isInvalid={ formik.touched.department_name && formik.errors.department_name }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.department_name }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="section">
                    <Row>
                        <Col><Form.Label>Section</Form.Label></Col>      
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="Section Alias" 
                                { ...formik.getFieldProps('section_name') } 
                                isInvalid={ formik.touched.section_name && formik.errors.section_name }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.section_name }
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


export default DivisionNamesForm;
