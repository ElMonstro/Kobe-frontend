import React, { useState } from "react";
import { CREATE } from "../../utils/constants";
import ScorecardCreate from "../ScorecardCreate";
import ScorecardNav from "../scorecardNav";

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(CREATE);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav />
            <ScorecardCreate />
            
        </div>
    )
}

export default ScorecardCont;