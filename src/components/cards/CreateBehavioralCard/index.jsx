import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';

import { useParams } from "react-router-dom";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { yupCreateBehavioral } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";


const CreateGlobalBehavioral = ({ settings }) => {

    const { companyId } = useParams();
    const [tierOptions, setTierOptions] = useState([]);

    const formik = useFormik({
        initialValues: {
            name: '',
            tier_cutoff: 1,
        },
        validationSchema: yupCreateBehavioral,
        enableReinitialize: false,
        onSubmit: async (values) => {
           makeRequest(getURLs().adminCreateGlobalBehaviorals(companyId), PATCH, values, true);
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
        <Card className="admin_card mission_card">
            <div className="card_title">Create User</div>

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
                <Form.Group className="mb-3" controlId="tier_cutoff">
                    <Row>
                        <Col><Form.Label>Upper Tier Cutoff</Form.Label></Col> 
                        <Col>
                        <Form.Select
                            { ...formik.getFieldProps('tier_cutoff') } 
                            isInvalid={ formik.touched.tier_cutoff && formik.errors.tier_cutoff }
                            >
                            <option>Tiers</option>
                            {
                                tierOptions.map(option => option)
                            }
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors.tier_cutoff }
                        </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </Card>
        
    );
};


export default CreateGlobalBehavioral;
