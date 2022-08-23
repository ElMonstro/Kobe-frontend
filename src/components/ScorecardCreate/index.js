import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap"
import { OVER_VIEW, SCORECARD } from "../../utils/constants";
import { useFormik } from 'formik';
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

import "./index.scss";
import { yupCascadeCutoffObj } from "../../utils/validators";
import thumbnail from "../../assets/josh_logo.jpg"

const ScorecardCreate = props => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);

    const formik = useFormik({
        initialValues: {
        upper_threshold: '',
        lower_threshold: '',
        },
        validationSchema: yupCascadeCutoffObj,
        onSubmit: async (values) => {
            // makeRequest(settingsURL, POST, values, true);
        },
    });
    
    return (
        <div className="score_card_create">
            <Form>
                <Card className="staff_card">
                    <div className="card_title title">Objective</div>
                    <div className="inputs_cont">
                        <Row className="inputs_row">
                            <Col>
                                <Form.Group className="mb-1" controlId="objective">
                                    <Form.Label>Objective</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('objective') } 
                                    isInvalid={ formik.touched.objective && formik.errors.objective }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.objective }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="perspective">
                                    <Form.Label>Perspective</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('perspective') } 
                                    isInvalid={ formik.touched.perspective && formik.errors.perspective }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.perspective }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Card>

                <Card className="staff_card">
                    <div className="card_title title">Measure</div>
                    
                    <div className="inputs_cont">
                        <Row className="inputs_row measure_inputs">
                            <Col>
                                <Form.Group className="mb-1" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('description') } 
                                    isInvalid={ formik.touched.description && formik.errors.description }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.description }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('weight') } 
                                    isInvalid={ formik.touched.weight && formik.errors.weight }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.weight }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="title">
                            Targets
                        </div>
                        <Row className="inputs_row">
                            <Col>
                                <Form.Group className="mb-1" controlId="data_type">
                                    <Form.Label>Data Type</Form.Label>
                                    <Form.Select 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('data_type') } 
                                    isInvalid={ formik.touched.data_type && formik.errors.data_type }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.data_type }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="percentage_target">
                                    <Form.Label>Target (%)</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('percentage_target') } 
                                    isInvalid={ formik.touched.percentage_target && formik.errors.percentage_target }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.percentage_target }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="inputs_row period_target">
                            <Col>
                                <Form.Group controlId="period">
                                    <Form.Label>Period</Form.Label>
                                    <Form.Select 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('period') } 
                                    isInvalid={ formik.touched.period && formik.errors.period }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.period }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group controlId="quaterly_target">
                                    <Form.Label>Quarterly Target</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('quaterly_target') } 
                                    isInvalid={ formik.touched.quaterly_target && formik.errors.quaterly_target }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.quaterly_target }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="quarterly_targets">
                            <Row className="quarter">
                                <Col className="quarter_name">Quarter 1</Col>
                                <Col className="target">25%</Col>
                            </Row>
                            <Row className="quarter">
                                <Col className="quarter_name">Quarter 2</Col>
                                <Col className="target">25%</Col>
                            </Row>
                            <Row className="quarter">
                                <Col className="quarter_name">Quarter 3</Col>
                                <Col className="target">25%</Col>
                            </Row>
                            <Row className="quarter">
                                <Col className="quarter_name">Quarter 4</Col>
                                <Col className="target">25%</Col>
                            </Row>
                        </div>

                        <Row className="inputs_row">
                            <Col>
                                <Form.Group className="mb-1" controlId="baseline">
                                    <Form.Label>Baseline</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('objective') } 
                                    isInvalid={ formik.touched.baseline && formik.errors.baseline }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.objective }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="target">
                                    <Form.Label>Target</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('target') } 
                                    isInvalid={ formik.touched.target && formik.errors.target }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.target }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="inputs_row">
                            <Col>
                                <Form.Group className="mb-1" controlId="lower_threshold">
                                    <Form.Label>Lower Threshold</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('lower_threshold') } 
                                    isInvalid={ formik.touched.lower_threshold && formik.errors.lower_threshold }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.lower_threshold }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="upper_threshold">
                                    <Form.Label>Upper Threshold</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('perspective') } 
                                    isInvalid={ formik.touched.lower_threshold && formik.errors.lower_threshold }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.lower_threshold }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="inputs_row">
                            <Col>
                                <Form.Group className="mb-1" controlId="budget">
                                    <Form.Label>Budget</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('budget') } 
                                    isInvalid={ formik.touched.budget && formik.errors.budget }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.budget }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>

                        <div className="initiatives">
                            <div className="title mb-2">
                                Initiatives
                            </div>
                            <Row className="initiatives_labels">
                                <Col lg={4}>Name</Col>
                                <Col className="weight_label">Weight</Col>
                                <Col>Cascade</Col>
                                <Col></Col>
                            </Row>

                            <Row className="inputs_row">
                            <Col lg={4}>
                                <Form.Group className="initiative" controlId="initiative">
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('initiative') } 
                                    isInvalid={ formik.touched.initiative && formik.errors.initiative }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.initiative }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="initiative_weight" controlId="initiative_weight">
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('initiative_weight') } 
                                    isInvalid={ formik.touched.initiative_weight && formik.errors.initiative_weight }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.initiative_weight }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <div className="cascaded">
                                    <span>
                                        <img className="thumbnail" src={ thumbnail } alt="J"/>
                                    </span>
                                
                                    <span className="underling_name">
                                        Joshua Moracha
                                    </span>
                                    
                                </div>
                            </Col>
                            <Col className="delete_btn">
                                <DeleteBin5 />
                            </Col>
                        </Row>

                            <Row className="inputs_row">
                            <Col lg={4}>
                                <Form.Group className="initiative" controlId="initiative">
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('initiative') } 
                                    isInvalid={ formik.touched.initiative && formik.errors.initiative }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.initiative }
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            </Col>
                            <Col>
                                <Form.Group className="initiative_weight" controlId="initiative_weight">
                                    <Form.Control 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('initiative_weight') } 
                                    isInvalid={ formik.touched.initiative_weight && formik.errors.initiative_weight }
                                    disabled
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.initiative_weight }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="cascade" controlId="cascade">
                                    <Form.Select 
                                    type="text" 
                                    placeholder=""
                                    { ...formik.getFieldProps('cascade') } 
                                    isInvalid={ formik.touched.cascade && formik.errors.cascade }
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        { formik.errors.cascade }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col className="delete_btn">
                                <DeleteBin5 />
                            </Col>
                        </Row>
                            
                        </div>
                    
                    </div>

                    <div className="form_btns">
                        <Button className="cancel_btn">Cancel</Button>
                        <Button className="submit_btn" type="submit">Submit</Button>
                    
                    </div>
                </Card>


            </Form>
        </div>
    )
}

export default ScorecardCreate;
