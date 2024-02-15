import React from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';

import { yupEditPerspectivesWeightObj } from "../../../utils/validators";
import { makeRequest } from "../../../utils/requestUtils";
import { PATCH } from "../../../utils/constants";
import "./index.scss";
import getURLs from "../../../services/urls";
import { useParams } from "react-router-dom";

const EditPerspectivesForm = ({ setSettings, settings }) => {

      const initialValues = {
         financial_weight: settings?.financial_weight,
         customer_weight: settings?.customer_weight,
         internal_processes_weight: settings?.internal_processes_weight,
         learning_growth_weight: settings?.learning_growth_weight,
      }
      const { companyId } = useParams();

      if (settings.behaviorals_enabled) {
         initialValues.behaviorals_weight = settings?.behaviorals_weight;
      }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yupEditPerspectivesWeightObj,
        enableReinitialize: true,
        onSubmit: async (values, {setFieldError}) => {
         let total = 0;
         Object.keys(values).forEach(key => {
            total += parseInt(values[key])
         });
         console.log(values)
         if (total !== 100) {
            Object.keys(values).forEach(key => {
                setFieldError(key, `All weights have to add up to 100`);
            });
            return;
        }
           makeRequest(getURLs().adminSettingsURL(companyId), PATCH, values, true)
            .then(data => setSettings(data));
        },
    });
    
    return (
        <Card className="admin_card">
            <div className="card_title">Edit Perspectives Weight</div>

            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="mb-3" controlId="financial_weight">
                    <Row>
                        <Col><Form.Label>Financial Weight</Form.Label></Col>
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('financial_weight') } 
                                isInvalid={ formik.touched.financial_weight && formik.errors.financial_weight }
                            /> 
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.financial_weight }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="vision">
                    <Row>
                        <Col><Form.Label>Customer Weight</Form.Label></Col> 
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('customer_weight') } 
                                isInvalid={ formik.touched.customer_weight && formik.errors.customer_weight }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.customer_weight }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="internal_processes_weight">
                    <Row>
                        <Col><Form.Label>Internal Processes Weight</Form.Label></Col>      
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('internal_processes_weight') } 
                                isInvalid={ formik.touched.internal_processes_weight && formik.errors.internal_processes_weight }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.internal_processes_weight }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3" controlId="learning_growth_weight">
                    <Row>
                        <Col><Form.Label>Learning & Growth Weight</Form.Label></Col>      
                        <Col>
                            <Form.Control 
                                type="text" 
                                placeholder="" 
                                { ...formik.getFieldProps('learning_growth_weight') } 
                                isInvalid={ formik.touched.learning_growth_weight && formik.errors.learning_growth_weight }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.learning_growth_weight }
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
               { settings?.behaviorals_enabled &&
                  <Form.Group className="mb-3" controlId="behaviorals_weight">
                        <Row>
                           <Col><Form.Label>Behavioral Weight</Form.Label></Col>      
                           <Col>
                              <Form.Control 
                                    type="text" 
                                    placeholder="" 
                                    { ...formik.getFieldProps('behaviorals_weight') } 
                                    isInvalid={ formik.touched.behaviorals_weight && formik.errors.behaviorals_weight }
                              />
                              <Form.Control.Feedback type='invalid'>
                                    { formik.errors.behaviorals_weight }
                              </Form.Control.Feedback>
                           </Col>
                        </Row>
                  </Form.Group>
                }
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>

        </Card>
        
    );
};


export default EditPerspectivesForm;
