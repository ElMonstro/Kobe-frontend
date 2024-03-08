import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { CREATE, PERSPECTIVE_OBJECT, BEHAVIORAL, NON_PERSPECTIVE } from "../../utils/constants";


const ObjectiveInputs = ({ formik, settings, initiativeId, name, perspective, role, is_self_cascaded }) => {

    const isDisabled = Boolean(initiativeId);
    const nameFieldProps = formik.getFieldProps('name');
    const perspectiveFieldProps = formik.getFieldProps('perspective');
    const { mode } = useParams();
    let perspectives_object = PERSPECTIVE_OBJECT;
    !settings.behaviorals_enabled && delete perspectives_object.behavioral_name
    
    if (mode === CREATE) {
        nameFieldProps.value = name;
        perspectiveFieldProps.value = perspective;
    }

    let ObjectiveTitle;
    is_self_cascaded? ObjectiveTitle = 'Initiative': ObjectiveTitle = 'Objective'
    
    return (
        <Card className="staff_card">
            <div className="card_title title">{ ObjectiveTitle }</div>
            <div className="inputs_cont">
                <Row className={ `inputs_row` }>
                    <Col>
                        <Form.Group className="mb-1" controlId="name">
                            <Form.Label>{ ObjectiveTitle }</Form.Label>
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
                                { !settings?.perspective_enabled &&
                                     <option value={ NON_PERSPECTIVE } className="">
                                        No Perspective 
                                    </option>
                                }
                                
                                { settings?.perspective_enabled &&
                                    Object.keys(perspectives_object).map(perspective => {
                                        return <option key={ perspective } value={perspectives_object[perspective]} className="">
                                                    { settings[perspective] }
                                                </option>
                                    })
                                }
                                { settings?.behaviorals_enabled &&
                                     <option value={ BEHAVIORAL } className="">
                                        {settings?.behavioral_name}
                                    </option>
                                }
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                { formik.errors.perspective }
                            </Form.Control.Feedback>
                        </Form.Group>
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
