import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import { yupPerspectiveCutoffObj } from "../../../utils/validators";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import "./index.scss";
import { useParams } from "react-router-dom";


const PerspectiveCutoffForm = ({ settings }) => {
    const [tierOptions, setTierOptions] = useState([]);
    const { companyId } = useParams();

    const formik = useFormik({
        initialValues: {
            perspective_cutoff: settings?.perspective_cutoff,
        },
        validationSchema: yupPerspectiveCutoffObj,
        enableReinitialize: true,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminSettingsURL(companyId), PATCH, values, true);
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
            <div className="card_title">Perspective Cutoff</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="perspective_cutoff">
                    <Form.Select
                    { ...formik.getFieldProps('perspective_cutoff') } 
                    isInvalid={ formik.touched.perspective_cutoff && formik.errors.perspective_cutoff }
                    >
                        <option>Tiers</option>
                        {
                            tierOptions.map(option => option)
                        }
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
