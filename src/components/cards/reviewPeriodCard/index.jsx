import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupReviewPeriodObj } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import "./index.scss";
import { useParams } from "react-router-dom";


const ReviewPeriodCard = props => {
    const { companyId } = useParams();
    const formik = useFormik({
        initialValues: {
            review_period: '',
        },
        validationSchema: yupReviewPeriodObj,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminSettingsURL(companyId), PATCH, values, true);
        },
    });

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Review Period</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="review_period">
                    <Form.Select 
                    { ...formik.getFieldProps('review_period') } 
                    isInvalid={ formik.touched.review_period && formik.errors.review_period }
                    >
                        <option value="3">Three months</option>
                        <option value="6">Six months</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                            { formik.errors.review_period }
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default ReviewPeriodCard;
