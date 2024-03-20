import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";

import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import getURLs from "../../../services/urls";
import { GET, OBJECTIVE, UPDATE } from "../../../utils/constants";
import InitiativeUpdate from "./initiative";
import { useOutletContext } from "react-router-dom";

const UpdateScorecardCard = () => {

    const [initiatives, setInitiatives] = useState([]);
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(UPDATE);
        makeRequest(getURLs().fetchSelfCascadedInitURL, GET, null, true, false)
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
                    <Col>Achieved</Col>
                    <Col lg={ 2 }>Status</Col>
                    <Col>Evidence</Col>
                    <Col></Col>
                </Row>
                {
                    initiatives?.map(initiative => {
                        if (initiative.type === OBJECTIVE && initiative.is_approved) {
                          return <InitiativeUpdate key={ initiative.id } { ...initiative }/>
                        }
                    })
                } 
            </div>
            
        </Card>
    )
}

export default UpdateScorecardCard;
