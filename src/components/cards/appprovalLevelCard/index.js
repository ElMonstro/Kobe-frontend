import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupApprovalLevels } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";

const ApprovalLevelCard = ({ settings }) => {

    const formik = useFormik({
        initialValues: {
            approval_levels: settings?.approval_levels,
        },
        validationSchema: yupApprovalLevels,
        enableReinitialize: true,
        onSubmit: async (values) => {
           makeRequest(getURLs().settingsURL, POST, values, true);
        },
    });

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Approval Levels</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="approval_levels">
                    <Form.Select
                    { ...formik.getFieldProps('approval_levels') }
                    isInvalid={ formik.touched.approval_levels && formik.errors.approval_levels }
                    >
                        <option>Approval Levels</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>

                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.approval_levels }
                    </Form.Control.Feedback> 
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};

export default ApprovalLevelCard;
