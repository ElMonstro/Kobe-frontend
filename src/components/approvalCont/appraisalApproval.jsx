import React from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";

import ImprovementAreas from "../createImprovementPlan/previousImprovements";


const AppraisalApproval = () => {

    const { appraisal } = useOutletContext();

    return (
        <div className="appraisal_approval">
            <div className="general_comments">
                <div className="label">General Comments</div>
                <div className="comments">{ appraisal?.general_comments }</div>
            </div>
            <div className="label">Improvement Areas</div>
            <ImprovementAreas appraisal={ appraisal } checkBoxDisabled={ true } />
        </div>
    )
}

export default AppraisalApproval;
