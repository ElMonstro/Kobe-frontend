import React from "react";
import { Form, Row, Col } from "react-bootstrap"


const QuaterlyTargetInputs = ({ formik }) => {

    return (
        <>
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
        </>
        );
}

export default QuaterlyTargetInputs;
