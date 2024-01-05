import React from "react";

import CascadeCutoffForm from "../cards/cascadeCutoffCard";

import "./index.scss";

const CascadeCutoffCont = props => {
    
    return (
        <div className="admin_cont">
            <CascadeCutoffForm { ...props }/>
        </div>
    )
}

export default CascadeCutoffCont;
