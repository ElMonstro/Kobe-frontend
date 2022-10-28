import React, { useEffect, useState } from "react";
import { Form, Card, Row, Col } from "react-bootstrap"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { CREATE, PERSPECTIVE_OBJECT } from "../../utils/constants";


const ObjectiveInputs = ({ formik, settings, initiativeId, name, perspective, role }) => {

    const isDisabled = Boolean(initiativeId);
    const nameFieldProps = formik.getFieldProps('name');
    const perspectiveFieldProps = formik.getFieldProps('perspective');
    const { mode } = useParams();
    const [displayWeight, setDisplayWeight] = useState(false);

    if (mode === CREATE) {
        nameFieldProps.value = name;
        perspectiveFieldProps.value = perspective;
    }

    useEffect(() => {
        role && setDisplayWeight(!Boolean(role?.reporting_to) && !Boolean(name));
    }, [role, name]);

    return (
        <Card className="staff_card">
            <div className="card_title title">Objective</div>
            <div className="inputs_cont">
                <Row className={ `inputs_row` }>
                    <Col>
                        <Form.Group className="mb-1" controlId="name">
                            <Form.Label>Objective</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...nameFieldProps }
                            isInvalid={ formik.touched.name && formik.errors.name }
                            disabled={ isDisabled }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.name }
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                    </Col>
                    <Col>
                        <Form.Group className="mb-1" controlId="perspective">
                            <Form.Label>Perspective</Form.Label>
                            <Form.Select 
                            type="text" 
                            placeholder=""
                            { ...perspectiveFieldProps }
                            isInvalid={ formik.touched.perspective && formik.errors.perspective }
                            disabled={ isDisabled }
                            >
                                <option>Perspectives</option>
                                {
                                    Object.keys(PERSPECTIVE_OBJECT).map(perspective => {
                                        return <option key={ perspective } value={PERSPECTIVE_OBJECT[perspective]} className="">{ settings[perspective] }</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.perspective }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="inputs_row">
                    <Col>
                    {   displayWeight &&
                        <Form.Group className="mb-1" controlId="weight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder=""
                            { ...formik.getFieldProps('weight') }
                            isInvalid={ formik.touched.weight && formik.errors.weight }
                            />
            
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.weight }
                            </Form.Control.Feedback>
                        </Form.Group>}
                    </Col>
                </Row>
            </div>
    </Card>
    );
}

const mapStateToProps = ({ adminReducer: { settings, orgChart }, }) => ({
    settings,
    role: orgChart[0] 
});

export default connect(
    mapStateToProps
) (ObjectiveInputs);
