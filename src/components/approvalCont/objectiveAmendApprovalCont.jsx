import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

import ViewAmendedObjective from "./viewAmendedObjective";


const ApprovalObjectiveView = () => {

    const { objective } = useOutletContext();
    const isObjectiveNew = objective?.approved_objective?.target === "0.00" ||  objective?.approved_objective?.target === undefined;
    let changeWording;
    isObjectiveNew? changeWording = "Created": changeWording = "Amended";

    return (
        <div className="view_objective">
            <Row className="header">
                <Col lg="4">
                    Name
                </Col>
                <Col className="second_half">
                    <Row>
                        <Col className="measure"> Measure </Col>
                        <Col> Weight </Col>
                        <Col >Budget</Col>
                        <Col> Target </Col>
                        <Col> Period Targets </Col>
                        {objective?.is_self_cascaded &&  <Col> Milestones </Col> }
                    </Row>
                </Col>
        </Row>
            { !isObjectiveNew &&
                <div className="original_objective">
                    <div className="objective_header">Original Objective</div>
                    <ViewAmendedObjective { ...objective?.approved_objective } />
                </div>
            }
            <div className="objective_header">{ changeWording } Objective</div>
            <ViewAmendedObjective { ...objective }/>
        </div>
    )
}
//TODO add milestones
export default ApprovalObjectiveView;
