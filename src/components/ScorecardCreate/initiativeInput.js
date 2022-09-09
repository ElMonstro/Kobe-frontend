import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

import thumbnail from "../../assets/josh_logo.jpg";
import { connect } from "react-redux";


const InitiativeInput = ({ formik, initiativeId, weightId, cascadeId, deleteId, deleteInitiative, underlings, orgChart }) => {

    const [selectedUser, setSelectedUser] = useState(null);

    const onDeleteInit = e => {
        const deleteId = e.target.parentElement.parentElement.id;
        deleteId && deleteInitiative(deleteId)
    }

    const Cascaded = (
    <div className="cascaded">
        <span>
            <img className="thumbnail" src={ thumbnail } alt="J"/>
        </span>

        <span className="underling_name">
            {selectedUser?.user.first_name} {selectedUser?.user.second_name}
        </span>
    
    </div>
    )

    const Cascade = (
        <Form.Group controlId={ cascadeId }>
                {
                 <Form.Select
                    className="cascade"
                    type="text" 
                    placeholder="Select Role"
                    valuedefault=""
                    { ...formik.getFieldProps(cascadeId) } 
                    isInvalid={ formik.touched[cascadeId] && formik.errors[cascadeId] }
                >
                    <option>Cascade to Employee</option>
                    <option value={ orgChart?.id } key={ orgChart?.id }>{ orgChart?.user.first_name + " "  + orgChart?.user.second_name}</option>
                    {
                        underlings?.map(underling => {
                            return (
                                <option value={ underling?.id } key={ underling?.id }>{ underling?.user.first_name + ' '  + underling?.user.second_name}</option>
                            )
                        })
                    }


                </Form.Select>
                }
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[cascadeId] }
                </Form.Control.Feedback>
                
            </Form.Group>
    )

    return (
        <Row className="inputs_row" id={ initiativeId }>
        <Col lg={4}>
            <Form.Group className="initiative_name" controlId={ initiativeId }>
                <Form.Control 
                type="text"
                valuedefault="" 
                placeholder=""
                { ...formik.getFieldProps(initiativeId) } 
                isInvalid={ formik.touched[initiativeId] && formik.errors[initiativeId] }
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[initiativeId] }
                </Form.Control.Feedback>
            </Form.Group>
            
        </Col>
        <Col>
            <Form.Group controlId={ weightId }>
                <Form.Control 
                    className="initiative_weight" 
                    type="text" 
                    placeholder=""
                    valuedefault=""
                    { ...formik.getFieldProps(weightId) } 
                    isInvalid={ formik.touched[weightId] && formik.errors[weightId] }
                    disabled
                />
                <Form.Control.Feedback type='invalid'>
                    { formik.errors[weightId] }
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
        <Col>
            {selectedUser? Cascaded: Cascade}
        </Col>
        <Col className="delete_btn">
            <span id={ deleteId } onClick={ onDeleteInit }><DeleteBin5 /></span>
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
