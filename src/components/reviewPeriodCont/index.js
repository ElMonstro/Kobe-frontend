import React from "react";

import "./index.scss";
import ReviewPeriodCard from "../cards/reviewPeriodCard";

const ReviewPeriodCont = props => {
    
    return (
        <div className="admin_cont">
            <ReviewPeriodCard { ...props }/>
        </div>
    )
}

export default ReviewPeriodCont;
