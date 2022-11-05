import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { OBJECTIVE } from "../../utils/constants";

import ViewObjective from "../viewScorecard/viewObjective";
import ObjectivesHeader from "../viewScorecard/viewScorecardHeader";


const ApprovalObjectiveView = () => {

    const { objective, setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(OBJECTIVE);
    }, []);

    return (
        <div className="view_objective">
            <ObjectivesHeader />
            <div className="objective_header">Original Objective</div>
            <ViewObjective { ...objective?.approved_objective } />
            <div className="objective_header">Updated Objective</div>
            <ViewObjective { ...objective } />
            
        </div>
    )
}

export default ApprovalObjectiveView;
