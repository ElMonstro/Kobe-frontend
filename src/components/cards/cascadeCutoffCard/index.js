import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupCascadeCutoffObj } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { POST } from "../../../utils/constants";
import "./index.scss";
import { useParams } from "react-router-dom";

const CascadeCutoffForm = ({ settings }) => {
    const [tierOptions, setTierOptions] = useState([]);
    const { companyId } = useParams();

    const formik = useFormik({
        initialValues: {
            cascade_cutoff: settings?.cascade_cutoff,
        },
        validationSchema: yupCascadeCutoffObj,
        enableReinitialize: true,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminSettingsURL(companyId), POST, values, true);
        },
    });

    useEffect(()=> {
        const options = [];
        for (let i=1; i<=settings.tiers; i++) {
            options.push(<option key={ i } value={ i }>Tier { i }</option>);
        }
        setTierOptions(options);
    }, [settings])
    

    

    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Cascade Cutoff</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="cascade_cutoff">
                    <Form.Select
                    { ...formik.getFieldProps('cascade_cutoff') }
                    isInvalid={ formik.touched.cascade_cutoff && formik.errors.cascade_cutoff }
                    >
                        <option>Tiers</option>
                        {
                            tierOptions.map(option => option)
                        }

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
