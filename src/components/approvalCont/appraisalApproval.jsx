import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

import ViewAmendedObjective from "./viewAmendedObjective";
import ImprovementAreas from "../createImprovementPlan/previousImprovements";


const AppraisalApproval = () => {

    const { appraisal } = useOutletContext();

    return (
        <div className="view_objective">
            <div className="general_comments">
                { appraisal.general_comments }
            </div>

            <ImprovementAreas appraisal={ appraisal } />

           
        </div>
    )
}

export default AppraisalApproval;
