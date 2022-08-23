import React, { useState, useEffect } from "react";
import { CREATE } from "../../utils/constants";
import UpdateScorecardCard from "../cards/updateScorecardCard";
import ScorecardCreate from "../ScorecardCreate";
import ScorecardNav from "../scorecardNav";

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(CREATE);
    const activeComponentMapper = {
        create: ScorecardCreate,
        update: UpdateScorecardCard
    }

    const ActiveComponent = activeComponentMapper[activeComponent];

    useEffect(() => {
        setActiveComponent(CREATE);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav setActiveComponent={ setActiveComponent } />
            <ActiveComponent />
            
        </div>
    )
}

export default ScorecardCont;