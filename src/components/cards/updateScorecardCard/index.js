import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useFormik } from 'formik';

import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import { createObjectiveURL, fetchSelfCascadedInitURL } from "../../../services/urls";
import { GET } from "../../../utils/constants";
import Initiative from "./initiative";

const UpdateScorecardCard = props => {

    const [initiatives, setInitiatives] = useState([])

    useEffect(() => {
        makeRequest(fetchSelfCascadedInitURL, GET, null, true, false)
        .then(data => {
            setInitiatives(data);
        });
    }, [])
    
    return (
        <Card className="staff_card update_scorecard">
            <div className="card_title title">Initiatives</div>
            <div className="initiatives">
                <Row className="title_bar">
                    <Col lg={3}>Name</Col>
                    <Col>Budget</Col>
                    <Col>Cost</Col>
                    <Col>Weight</Col>
                    <Col>Target</Col>
                    <Col>Score</Col>
                    <Col>Status</Col>
                    <Col>Evidence</Col>
                    <Col></Col>
                </Row>
                {
                    initiatives?.map(initiative => {
                        return <Initiative key={ initiative.id } { ...initiative }/>
                    })
                } 
            </div>
            
        </Card>
    )
}

export default UpdateScorecardCard;
