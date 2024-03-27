import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';

import { useParams } from "react-router-dom";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { yupCreateBehavioral } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";


const CreateBehavioralForm = ({ settings, setBehaviorals, behaviorals }) => {

    const { companyId } = useParams();
    const [tierOptions, setTierOptions] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            upper_tier_cutoff: 1,
            lower_tier_cutoff: 2,
        },
        validationSchema: yupCreateBehavioral,
        enableReinitialize: false,
        onSubmit: (values) => {
           makeRequest(getURLs().adminCreateGlobalBehaviorals(companyId), PATCH, values, true)
            .then(data => data && setBehaviorals([...behaviorals, data]));
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
        <Form onSubmit={ formik.handleSubmit }>
            <Form.Group className="mb-3" controlId="name">
                <Row>
                    <Col><Form.Label>Name</Form.Label></Col>
                    <Col>
                        <Form.Control 
                            type="text" 
                            placeholder="" 
                            { ...formik.getFieldProps('name') } 
                            isInvalid={ formik.touched.name && formik.errors.name }
                        /> 
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.name }
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="upper_tier_cutoff">
                <Row>
                    <Col><Form.Label>Upper Tier Cutoff</Form.Label></Col> 
                    <Col>
                    <Form.Select
                        { ...formik.getFieldProps('upper_tier_cutoff') } 
                        isInvalid={ formik.touched.upper_tier_cutoff && formik.errors.upper_tier_cutoff }
                        >
                        <option>Tiers</option>
                        {
                            tierOptions.map(option => option)
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.upper_tier_cutoff }
                    </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lower_tier_cutoff">
                <Row>
                    <Col><Form.Label>Lower Tier Cutoff</Form.Label></Col> 
                    <Col>
                    <Form.Select
                        { ...formik.getFieldProps('lower_tier_cutoff') } 
                        isInvalid={ formik.touched.lower_tier_cutoff && formik.errors.lower_tier_cutoff }
                        >
                        <option>Tiers</option>
                        {
                            tierOptions.map(option => option)
                        }
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        { formik.errors.lower_tier_cutoff }
                    </Form.Control.Feedback>
                    </Col>
                </Row>
            </Form.Group>
            
            <Button className="card_btn" variant="primary" type="">
                Save
            </Button>
        </Form>        
    );
};

export default CreateBehavioralForm;
