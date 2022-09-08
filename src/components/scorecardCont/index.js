import React, { useState, useEffect } from "react";
import { CREATE, UPDATE } from "../../utils/constants";
import CascadedCards from "../cards/cascadedCards";
import UpdateScorecardCard from "../cards/updateScorecardCard";
import ScorecardCreate from "../ScorecardCreate";
import ScorecardNav from "../scorecardNav";
import ViewScorecardCard from "../viewScorecard";

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(CREATE);
    const activeComponentMapper = {
        create: ScorecardCreate,
        update: UpdateScorecardCard,
        cascaded: CascadedCards,
        view: ViewScorecardCard
    }

    const ActiveComponent = activeComponentMapper[activeComponent];

    useEffect(() => {
        setActiveComponent(UPDATE);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav setActiveComponent={ setActiveComponent } />
            <ActiveComponent />
            
        </div>
    )
}

export default ScorecardCont;
