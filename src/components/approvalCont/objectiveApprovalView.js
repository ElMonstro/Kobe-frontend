import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";

import ViewObjective from "../viewScorecard/viewObjective";
import ObjectivesHeader from "../viewScorecard/viewScorecardHeader";


const ApprovalObjectiveView = () => {

    const { objective, approve, reject} = useOutletContext();

    return (
        <div className="view_objective">
            <ObjectivesHeader />
            <div className="objective_header">Original Objective</div>
            <ViewObjective { ...objective?.approved_objective } />
            <div className="objective_header">Updated Objective</div>
            <ViewObjective { ...objective } />
            <div className="approval_buttons">
                <Button onClick={ approve } className="response_button approve">Approve Updates</Button>
                <Button onClick={ reject } className="response_button reject">Reject Updates</Button>
            </div>
            
        </div>
    )
}

export default ApprovalObjectiveView;
