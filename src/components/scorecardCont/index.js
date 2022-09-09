import React, { useState, useEffect } from "react";
import { CASCADED, CREATE, UPDATE, VIEW } from "../../utils/constants";
import CascadedCards from "../cards/cascadedCards";
import UpdateScorecardCard from "../cards/updateScorecardCard";
import ScorecardCreate from "../ScorecardCreate";
import ScorecardNav from "../scorecardNav";
import ViewScorecardCard from "../viewScorecard";
  

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(CASCADED);
    const activeComponentMapper = {
        create: ScorecardCreate,
        update: UpdateScorecardCard,
        cascaded: CascadedCards,
        view: ViewScorecardCard
    }

    const [intiativeId, setInitiativeId] = useState(null);

    const ActiveComponent = activeComponentMapper[activeComponent];

    useEffect(() => {
        setActiveComponent(CREATE);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav setActiveComponent={ setActiveComponent } />
            <ActiveComponent setActiveComponent={ setActiveComponent } setInitiativeId={ setInitiativeId } initiativeId={intiativeId}/>
            
        </div>
    )
}

export default ScorecardCont;
