import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupCascadeCutoffObj } from "../../../utils/validators";
import { settingsURL } from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";


const CascadeCutoffForm = props => {

    const formik = useFormik({
        initialValues: {
            cascade_cutoff: '',
        },
        validationSchema: yupCascadeCutoffObj,
        onSubmit: async (values) => {
            console.log(values)
           makeRequest(settingsURL, POST, values, true);
        },
    });

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Cascade Cutoff</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="cascade_cutoff">
                    <Form.Select
                    { ...formik.getFieldProps('cascade_cutoff') }
                    isInvalid={ formik.touched.cascade_cutoff && formik.errors.cascade_cutoff }
                    >
                        <option value="1">Tier One</option>
                        <option value="2">Tier Two</option>
                        <option value="3">Tier Three</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.cascade_cutoff }
                    </Form.Control.Feedback> 
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default CascadeCutoffForm;
