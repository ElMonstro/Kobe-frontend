import React from "react";
import { connect } from "react-redux";

import { Form, Row, Col } from "react-bootstrap"


const QuaterlyTargetInputs = ({ formik, periods }) => {

    const periodHalfLength = periods.length / 2;

    return (
        <>
           <Row className="inputs_row period_target">
                <Col>
                    {
                        periods.slice(0, periodHalfLength).map(
                            period => {
                            return <Form.Group key={ period } controlId={ period } className="mb-3">
                                <Form.Label>{ period } Target</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps(period) } 
                                isInvalid={ formik.touched[period] && formik.errors[period] }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { formik.errors[period] }
                                </Form.Control.Feedback>
                            </Form.Group>
                        }) 
                    }
                </Col>
                <Col>
                    {
                        periods.slice(periodHalfLength).map(
                            period => {
                            return <Form.Group key={ period } controlId={ period } className="mb-3">
                                <Form.Label>{ period } Target</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder=""
                                { ...formik.getFieldProps(period) } 
                                isInvalid={ formik.touched[period] && formik.errors[period] }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { formik.errors[period] }
                                </Form.Control.Feedback>
                            </Form.Group>
                        })
                        
                    }
                </Col>
            </Row>
        </>
        );
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { periods }, }) => ({
    periods,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (QuaterlyTargetInputs);
