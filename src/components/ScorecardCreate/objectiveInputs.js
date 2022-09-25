import React from "react";
import { Form, Card, Row, Col } from "react-bootstrap"
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { CREATE, PERSPECTIVE_OBJECT } from "../../utils/constants";


const ObjectiveInputs = ({ formik, settings, initiativeId, name, perspective }) => {

    const isDisabled = Boolean(initiativeId);
    const nameFieldProps = formik.getFieldProps('name');
    const perspectiveFieldProps = formik.getFieldProps('perspective');
    const { mode } = useParams();

    if (mode === CREATE) {
        nameFieldProps.value = name;
        perspectiveFieldProps.value = perspective;
    }

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
                                        return <option key={ perspective } className="">{ settings[perspective] }</option>
                                    })
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

const mapStateToProps = ({ adminReducer: { settings }, }) => ({
    settings, 
});

export default connect(
    mapStateToProps
) (ObjectiveInputs);
