import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from 'formik';
import { useOutletContext } from "react-router-dom";

import { yupEditPerspectivesWeightObj } from "../../utils/validators";
import { PATCH, WEIGHTS } from "../../utils/constants";
import "./index.scss";
import getURLs from "../../services/urls";
import { GET } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";

const EditObjectivesWeights = () => {

    const initialValues = {};
    const [objectives, setObjectives] = useState([]);
    const { setActiveComponent } = useOutletContext();
    
    useEffect(() => {
        
        setActiveComponent(WEIGHTS)
        makeRequest(getURLs().createObjectiveURL, GET, null, true, false)
            .then(objectives => data && setObjectives(objectives))
    }, []);

    objectives.map(obj => initialValues[obj.id] = obj.weight );
    
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: yupEditPerspectivesWeightObj,
        enableReinitialize: true,
        onSubmit: async (values, {setFieldError}) => {
         let total = 0;
         const valueList = [];
         Object.keys(values).forEach(key => {
            total += parseInt(values[key]);
            valueList.push({id: key, weight: values[key]});
         });
         if (total !== 100) {
            Object.keys(values).forEach(key => {
                setFieldError(key, `All weights have to add up to 100`);
            });
            return;
        }

        makeRequest(getURLs().updateWeightsURL, PATCH, {objectives: valueList}, true, true);
        },
    });
    
    return (
        <div className="update_weights">

            {objectives.length > 0 && 
            <Form onSubmit={ formik.handleSubmit }>
                {
                    objectives.map(objective => {
                        return (
                            <Form.Group className="mb-3" controlId={ objective.id }>
                                <Row>
                                    <Col><Form.Label>{ objective.name?.slice(0, 30) }</Form.Label></Col>
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="" 
                                            { ...formik.getFieldProps(objective.id) } 
                                            isInvalid={ formik.touched[objective.id] && formik.errors[objective.id] } 
                                        />
                                        <Form.Control.Feedback type="invalid">{ formik.errors[objective.id] }</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>
                        ) 
                    })
                }
                <Row>
                    <Col></Col>
                    <Col>
                        <Button className="card_btn" variant="primary" type="">
                            Submit
                        </Button>
                    </Col>
                    
                </Row>
                
            </Form>}

        </div>
        
    );
};


export default EditObjectivesWeights;
