import React from "react";
import { connect } from "react-redux";

import { Form, Row, Col } from "react-bootstrap"
import { FieldArray } from "formik";

const QuaterlyTargetInputs = ({ formik, periods }) => {

    const periodHalfLength = periods.length / 2;

    return (
        <FieldArray name="period_targets" render={ () => {
            return (
                <Row className="inputs_row period_target">
                    <Col>
                        {
                            formik.values.period_targets?.slice(0, periodHalfLength).map(
                                (period, index) => {
                                    const name = `period_targets.${index}.name`;
                                    const target = `period_targets.${index}.target`;

                                return (
                                    <div key={ name }>
                                        <Form.Group key={ name } controlId={ name } className="mb-3">
                                            <Form.Control 
                                                type="hidden" 
                                                placeholder=""
                                                { ...formik.getFieldProps(name) } 
                                                />
                                        </Form.Group>
                                        <Form.Group key={ target } controlId={ target } className="mb-3">
                                            <Form.Label>{ period.name } Target </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder=""
                                                { ...formik.getFieldProps(target) } 
                                                isInvalid={ formik.touched[target] && formik.errors[target] }
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                { formik.errors[target] }
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                )
                            }) 
                        }
                    </Col>
                    <Col>
                        {
                            formik.values.period_targets?.slice(periodHalfLength).map(
                                (period, index) => {
                                    index = index + periodHalfLength;
                                    const name = `period_targets.${index}.name`;
                                    const target = `period_targets.${index}.target`;

                                    return (
                                        <div  key={ name }>
                                            <Form.Group controlId={ name } className="mb-3">
                                                <Form.Control 
                                                    type="hidden" 
                                                    placeholder=""
                                                    { ...formik.getFieldProps(name) } 
                                                    />
                                            </Form.Group>
                                            <Form.Group key={ target } controlId={ target } className="mb-3">
                                                <Form.Label>{ period.name } Target </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder=""
                                                    { ...formik.getFieldProps(target) } 
                                                    isInvalid={ formik.touched[target] && formik.errors[target] }
                                                />
                                                <Form.Control.Feedback type='invalid'>
                                                    { formik.errors[target] }
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    )
                            })
                        }
                    </Col>
                </Row>
            )
        }}
           
        />
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
