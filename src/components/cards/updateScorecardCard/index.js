import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import { fetchSelfCascadedInitURL } from "../../../services/urls";
import { GET, OBJECTIVE, UPDATE } from "../../../utils/constants";
import Initiative from "./initiative";
import { useOutletContext } from "react-router-dom";

const UpdateScorecardCard = () => {

    const [initiatives, setInitiatives] = useState([]);
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(UPDATE);
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
                        if (initiative.type === OBJECTIVE) {
                          return <Initiative key={ initiative.id } { ...initiative }/>
                        }
                    })
                } 
            </div>
            
        </Card>
    )
}

export default UpdateScorecardCard;
