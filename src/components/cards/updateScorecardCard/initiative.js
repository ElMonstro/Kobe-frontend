import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupUpdateObjective } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import { PATCH } from "../../../utils/constants";
import { updateObjectiveURL as retrieveObjectiveURL } from "../../../services/urls";

const Initiative = ({ id, name, budget, score, target, cost, weight, status }) => {

    const scorePercentage = score * 100;

    const formik = useFormik({
        initialValues: {
            score: scorePercentage,
            budget: budget,
            cost: cost,
            evidence: "",
            id: id
        },
        validationSchema: yupUpdateObjective,
        onSubmit: async (values) => {
            values.score = (values.score/ 100).toFixed(2);
            const id = values.id;
            makeRequest(retrieveObjectiveURL(id), PATCH, values, true);
            values.score = values.score * 100;
        },
    });

    return (
    <Form onSubmit={ formik.handleSubmit }>        
        <Row className="initiative">
            <Col lg={3} className="initiative_name">
                { name }
            </Col>
            <Col>
                <div className="budget">
                    { budget }
                </div>
            </Col>
            <Col>
                <input 
                    id="cost" 
                    { ...formik.getFieldProps("cost") } 
                    placeholder="130.00" 
                    className="cost_input" 
                 />
                 <Form.Control.Feedback type='invalid'>
                    { formik.errors.cost }
                </Form.Control.Feedback>
            </Col>
            <Col className="weight">
                { weight }
            </Col>
            <Col className="target">
                { target }
            </Col>
            <Col>
                <input 
                    id="score" 
                    placeholder="15"
                    valuedefault={ scorePercentage } 
                    { ...formik.getFieldProps("score") } 
                    className="score_input"
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors.score }
                </Form.Control.Feedback>

            </Col>
            <Col>
                <span className={`status_color ${ status }`}></span>
                <span className="status_text">{ status }</span>
            </Col>
            <Col>
                <input 
                    id="evidence"
                    className="evidence_input"
                    placeholder="https://www.google.com" 
                    { ...formik.getFieldProps("evidence") }  
                />
                <Form.Control.Feedback type='invalid'>
                     { formik.errors.evidence }
                </Form.Control.Feedback>
            </Col>
            <Col>
                <Button type="submit" className="update_btn">Save</Button>
            </Col>
        </Row>
    </Form>
    )
}

export default Initiative
