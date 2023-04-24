import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupPerspectiveOrder } from "../../../utils/validators";
import { settingsURL } from "../../../services/urls";
import { CUSTOMER_FIRST, FINANCIAL_FIRST, POST } from "../../../utils/constants";
import "./index.scss";


const PerspectiveOrderForm = ({ settings }) => {

    const formik = useFormik({
        initialValues: {
            perspective_order: settings?.perspective_order,
        },
        validationSchema: yupPerspectiveOrder,
        enableReinitialize: true,
        onSubmit: async (values) => {
           makeRequest(settingsURL, POST, values, true);
        },
    });

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Perspective Order</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="perspective_order">
                    <Form.Select
                    { ...formik.getFieldProps('perspective_order') } 
                    isInvalid={ formik.touched.perspective_order && formik.errors.perspective_order }
                    >
                        <option>Perspective Order</option>
                        <option value={ FINANCIAL_FIRST }> Financial First</option>
                        <option value={ CUSTOMER_FIRST }> Customer First</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                            { formik.errors.perspective_order }
                    </Form.Control.Feedback>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
    );
};

export default PerspectiveOrderForm;
