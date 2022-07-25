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
        },
        validationSchema: yupMissionFormObj,
        onSubmit: async (values) => {
           makeRequest(companyInfoURL, POST, values, true);
        },
    });
    
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Add organization Mission and Vision</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-3" controlId="mission">
                        <Form.Label>Mission</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="" 
                            { ...formik.getFieldProps('mission') } 
                            isInvalid={ formik.touched.mission && formik.errors.mission }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.mission }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="vision">
                        <Form.Label>Vision</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="" 
                            { ...formik.getFieldProps('vision') } 
                            isInvalid={ formik.touched.vision && formik.errors.vision }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.vision }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                </Row>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </Card>
        
    );
};


export default MissionVisionForm;
