import React from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

import { connect } from "react-redux";


const InitiativeInput = ({ formik, index, underlings, orgChart, arrayHelpers }) => {

    const name = `initiatives.${index}.name`;
    const role = `initiatives.${index}.role`;
    const weight = `initiatives.${index}.weight`;

    const onDeleteInit = e => {
        arrayHelpers.remove(index)
    }

    return (
        <Row className="inputs_row" id={ name }>
        <Col lg={4}>
            <Form.Group className="initiative_name" controlId={ name }>
                <Form.Control 
                type="text"
                valuedefault="" 
                placeholder=""
                { ...formik.getFieldProps(name) } 
                isInvalid={ formik.touched[name] && formik.errors[name] }
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[name] }
                </Form.Control.Feedback>
            </Form.Group>
            
        </Col>
        <Col>
            <Form.Group controlId={ weight }>
                <Form.Control 
                    className="initiative_weight" 
                    type="text" 
                    placeholder=""
                    valuedefault=""
                    { ...formik.getFieldProps(weight) } 
                    isInvalid={ formik.touched[weight] && formik.errors[weight] }
                    disabled
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[weight] }
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId={ role }>
                {
                 <Form.Select
                    className="cascade"
                    type="text" 
                    placeholder="Select Role"
                    valuedefault={orgChart?.id}
                    { ...formik.getFieldProps(role) } 
                    isInvalid={ formik.touched[role] && formik.errors[role] }
                >
                    <option>Cascade Initiative</option>
                    <option value={ orgChart?.id } key={ orgChart?.id }>Cascade to Self</option>
                    {
                        underlings?.map(underling => {
                            return (
                                <option value={ underling?.id } key={ underling?.id }>
                                    { underling?.user.first_name + ' '  + underling?.user.second_name}
                                </option>
                            )
                        })
                    }


                </Form.Select>
                }
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[role] }
                </Form.Control.Feedback>
                
            </Form.Group>
        </Col>
        <Col className="delete_btn">
            {index > 0 && 
                <span onClick={ onDeleteInit }><DeleteBin5 /></span>
                }
        </Col>
    </Row>
    );
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { orgChart }, }) => ({
    orgChart: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (InitiativeInput);
