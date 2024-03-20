import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap"
import { useFormik } from 'formik';

import { yupThresholdObj } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import { useParams } from "react-router-dom";


const ThresholdsForm = ({settings})=> {
    const { companyId } = useParams();
    const formik = useFormik({
        initialValues: {
        upper_threshold: settings.upper_threshold,
    lower_threshold: settings.lower_threshold,
        },
        validationSchema: yupThresholdObj,
        enableReinitialize: true,
        onSubmit: async (values) => {
            makeRequest(getURLs().adminSettingsURL(companyId), PATCH, values, true);
        },
    });

    return (
        <Card className="admin_card threshold_card">
            <div className="card_title">Thresholds</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Row className="inputs_row">
                <Col>
                    <Form.Group className="mb-3" controlId="lower_threshold">
                        <Form.Label>Lower</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...formik.getFieldProps('lower_threshold') } 
                        isInvalid={ formik.touched.lower_threshold && formik.errors.lower_threshold }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.lower_threshold }
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="upper_threshold">
                        <Form.Label>Upper</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder=""
                        { ...formik.getFieldProps('upper_threshold') } 
                        isInvalid={ formik.touched.upper_threshold && formik.errors.upper_threshold }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.upper_threshold }
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


export default ThresholdsForm;
