import React from "react";

import "./index.scss";
import ReviewPeriodCard from "../cards/reviewPeriodCard";
import AppraisalSettingsCard from "../cards/appraisalCard";
import SetCurrentPeriodForm from "../cards/setCurrentPeriodCard";

const ReviewPeriodCont = props => {
    
    return (
        <div className="admin_cont">
            <ReviewPeriodCard { ...props }/>
            <SetCurrentPeriodForm { ...props }/>
            <AppraisalSettingsCard { ...props }/>
        </div>
    )
}

export default ReviewPeriodCont;
