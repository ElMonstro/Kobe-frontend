import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupPerspectiveCutoffObj } from "../../../utils/validators";
import { settingsURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";


const PerspectiveCutoffForm = props => {

    const formik = useFormik({
        initialValues: {
            perspective_cutoff: '',
        },
        validationSchema: yupPerspectiveCutoffObj,
        onSubmit: async (values) => {
           makeRequest(settingsURL, POST, values, true);
        },

        
    });

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Perspective Cutoff</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="perspective_cutoff">
                    <Form.Select
                    { ...formik.getFieldProps('perspective_cutoff') } 
                    isInvalid={ formik.touched.perspective_cutoff && formik.errors.perspective_cutoff }
                    >
                        <option value="1">Tier One</option>
                        <option value="2">Tier Two</option>
                        <option value="3">Tier Three</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                            { formik.errors.perspective_cutoff }
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default PerspectiveCutoffForm;
