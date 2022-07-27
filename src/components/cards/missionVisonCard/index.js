import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupMissionFormObj } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import { companyInfoURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";


const MissionVisionForm = props => {

    const formik = useFormik({
        initialValues: {
        vision: '',
        mission: '',
        name: ''
        },
        validationSchema: yupMissionFormObj,
        onSubmit: async (values) => {
           makeRequest(companyInfoURL, POST, values, true);
        },
    });
    
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Add Organization Info</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="name">
                    <Row>
                        <Col><Form.Label>Name</Form.Label></Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('name') } 
                                isInvalid={ formik.touched.name && formik.errors.name }
                            /> 
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.name }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="vision">
                    <Row>
                        <Col><Form.Label>Vision</Form.Label></Col> 
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('vision') } 
                                isInvalid={ formik.touched.vision && formik.errors.vision }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.vision }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mission">
                    <Row>
                        <Col><Form.Label>Mission</Form.Label></Col>      
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('mission') } 
                                isInvalid={ formik.touched.mission && formik.errors.mission }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.mission }
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


export default MissionVisionForm;
