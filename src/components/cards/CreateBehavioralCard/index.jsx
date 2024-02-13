import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CreateBehavioralForm from "./form";
import { GET, PATCH } from "../../../utils/constants";
import getURLs from "../../../services/urls";
import { makeRequest } from "../../../utils/requestUtils";
import { useParams } from "react-router-dom";
import { Bin } from "styled-icons/icomoon";
import "./index.scss";
import { removeObjectWithId } from "../../../utils";


const CreateBehavioralCard = ({ settings }) => {
    const [behaviorals, setBehaviorals] = useState([]);
    const { companyId } = useParams();

    function deleteBehavior(behavior) {
        const delete_behavior = () => {
            makeRequest(getURLs().adminDeleteBehaviorals(companyId), PATCH, behavior, true)
                .then(data => {
                    setBehaviorals(removeObjectWithId(behaviorals, behavior.id));
                });
        }

        return delete_behavior;
    }

    useEffect(() => {
        makeRequest(getURLs().adminCreateGlobalBehaviorals(companyId), GET, null, true, false)
            .then(data =>  data && setBehaviorals(data));

        }, []);
    
    return (
        <Card className="admin_card mission_card">
            <div className="card_title">Create Global Behaviorals</div>
            <Row className="behaviorals_cont">

                <Col>
                    <CreateBehavioralForm 
                        settings={ settings } 
                        setBehaviorals={ setBehaviorals } 
                        behaviorals={ behaviorals } 
                        />
                </Col>
                <Col className="behaviorals">
                    <Row className="header">
                        <Col>Name</Col>
                        <Col>Tier Cutoff</Col>
                        <Col></Col>

                    </Row>
                    { behaviorals.map(behavior =>
                        <Row className="behavior">
                            <Col>{ behavior.name }</Col>
                            <Col>{ behavior.tier_cutoff }</Col>
                            <Col>
                                <span className="delete" onClick={deleteBehavior(behavior)}>
                                    <Bin />
                                </span>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        
        </Card>
        
    );
};


export default CreateBehavioralCard;
