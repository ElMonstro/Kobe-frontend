import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupUpdateObjective } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import { ERROR, PATCH, UNITS } from "../../../utils/constants";
import { updateObjectiveURL as retrieveObjectiveURL } from "../../../services/urls";
import { fireNotification } from "../../../utils";
import { connect } from "react-redux";

const InitiativeUpdate = ({ 
    id, name, budget,
    score, percentage_target, units_target, 
    cost, weight, status, data_type, score_being_approved,
    role
}) => {

    let target;
    data_type === UNITS? target = units_target: target = percentage_target;
    const [isScoreBeingApproved, setScoreBeingApproved] = useState(score_being_approved);
    weight = parseInt(weight);

    const formik = useFormik({
        initialValues: {
            score: score,
            budget: budget,
            cost: cost,
            evidence: "",
            id: id
        },
        validationSchema: yupUpdateObjective,
        onSubmit: async (values) => {
            // if (isScoreBeingApproved) {
            //     fireNotification(ERROR, "You previous update is being approved. Please wait until the process is completed.")
            //     return
            // }

            if (parseInt(score) === parseInt(values.score) && parseInt(cost) === parseInt(values.cost)) {
                fireNotification(ERROR, "You must change score or cost to create a valid update")
                return
            }

            if (!values.evidence) {
                fireNotification(ERROR, "You must enter evidence url")
                return
            }

            role?.reporting_to && setScoreBeingApproved(true);
            makeRequest(retrieveObjectiveURL(values.id), PATCH, values, true);
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
                    valuedefault={ score } 
                    { ...formik.getFieldProps("score") } 
                    className="score_input"
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors.score }
                </Form.Control.Feedback>

            </Col>
            <Col lg={ 2 } className="status_col">
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

const mapStateToProps = ({ adminReducer: { settings, orgChart }, }) => ({
    settings,
    role: orgChart[0] 
});

export default connect(
    mapStateToProps
) (InitiativeUpdate);
