import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupSelectPeriodObj } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { GET, PATCH } from "../../../utils/constants";
import { useParams } from "react-router-dom";

const SetCurrentPeriodForm = ({ settings }) => {
    const [periods, setPeriods] = useState([]);
    const { companyId } = useParams();
    const formik = useFormik({
        initialValues: {
            current_period: settings?.current_period,
        },
        validationSchema: yupSelectPeriodObj,
        enableReinitialize: true,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminSettingsURL(companyId), PATCH, values, true);
        },
    });

    useEffect(()=> {
        makeRequest(getURLs().fetchPeriodsURL, GET, null, true, false)
        .then(data => { data && setPeriods(data) });
    }, [settings])

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Current Period</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="cascade_cutoff">
                    <Form.Select
                        { ...formik.getFieldProps('current_period') }
                        isInvalid={ formik.touched.current_period && formik.errors.current_period }
                    >
                        <option>Current period</option>
                        {
                            periods.map(period => <option key={period.id} value={period.id}>{[period.period]}</option>)
                        }

                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.current_period }
                    </Form.Control.Feedback> 
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};

export default SetCurrentPeriodForm;
