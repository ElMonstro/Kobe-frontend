import React from "react";

import { Form } from "react-bootstrap";


const QuaterlyTargetInput = ({ formik, index, period }) => {

    const name = `period_targets.${index}.period`;
    const target = `period_targets.${index}.target`;
    let touched = {}
    let errors = {};
    let cummulativeError = formik.errors?.period_targets;
    formik.touched?.period_targets? touched = formik.touched?.period_targets[index]: touched = {};
    formik.errors?.period_targets? errors = formik.errors?.period_targets[index]: errors = {};
    const showCummulativeError = typeof cummulativeError === 'string';

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
                <Form.Label>{ period.period } Target </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder=""
                    { ...formik.getFieldProps(target) } 
                    isInvalid={ showCummulativeError || touched?.target && errors?.target }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors?.target }
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                    { showCummulativeError && cummulativeError }
                </Form.Control.Feedback>
            </Form.Group>
        </div>
    )
}

export default QuaterlyTargetInput;
