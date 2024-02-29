import React, { useEffect, useState } from "react";

import "./index.scss";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { APPRAISE, GET, POST } from "../../utils/constants";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { yupAppraise } from "../../utils/validators";
import { useOutletContext } from "react-router-dom";
import ImprovementInput from "./improvementArea";
import { Plus } from "styled-icons/bootstrap";
import ImprovementAreas from "./previousImprovements";

const Appraise = ({  }) => {

    const { setActiveComponent } = useOutletContext();
    const [previousAppraisal, setPreviousAppraisal] = useState({})

    const formik = useFormik({
        initialValues: {
            improvement_areas: [{
                improvement_area: '',
                improvement_activity: '',
                timeline: '',
            }],
            general_comments: '',
        },
        validationSchema: yupAppraise,
        enableReinitialize: true,

        onSubmit: (values) => {
        makeRequest(getURLs().appraiseURL, POST, values, true)
        },
    });

    useEffect(()=> {
        setActiveComponent(APPRAISE);
        makeRequest(getURLs().fetchPreviousAppraisalURL, GET, null, true, false)
            .then(data => setPreviousAppraisal(data));
    }, [])
    
    return (
        <div className="scorecard_appraise">
            <FormikProvider value={ formik }>
            <Form onSubmit={ formik.handleSubmit }>
                <Card className="staff_card">
                    <div className="appraise_title">General Comments</div>
                    <Form.Group controlId="general_comments">
                        <Form.Control 
                            className="" 
                            type="text" 
                            as="textarea"
                            placeholder=""
                            valuedefault=""
                            { ...formik.getFieldProps("general_comments") } 
                            isInvalid={ formik.touched["general_comments"] && formik.errors["general_comments"] }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formik.errors["general_comments"] }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Card>
                <Card className="staff_card">
                    <ImprovementAreas appraisal={ previousAppraisal } />
                </Card>
                <Card className="staff_card">
                    <FieldArray
                        name="improvement_areas"
                        render={  arrayHelpers => (
                            <div className="improvement_areas">
                                <Row className="appraise_title">
                                    <Col>Improvement Area</Col>
                                    <Col>Improvement Activity</Col>
                                    <Col>Timeline</Col>
                                    <Col lg={1}>
                                        <span className="add_btn icon"
                                            onClick={ () => arrayHelpers.push({
                                                    improvement_area: '',
                                                    improvement_activity: '',
                                                    timeline: '',
                                                })}> 
                                                <Plus />
                                        </span>
                                    </Col>
                                </Row>

                                {
                                    formik.values.improvement_areas.map((area, index) => (
                                        <ImprovementInput key={ index } formik={ formik } index={ index } arrayHelpers={ arrayHelpers } />
                                    ))
                                }
                            </div>
                        )}
                    />
                </Card>

                <div className="form_btns">
                    <Button className="submit_btn" type="">Submit</Button>
                </div>
            </Form>
            </FormikProvider>
            
        </div>
    )
}

export default Appraise;
