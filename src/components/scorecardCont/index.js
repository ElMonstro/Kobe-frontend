import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CASCADED, CREATE, UPDATE, VIEW } from "../../utils/constants";
import CascadedCards from "../cards/cascadedCards";
import UpdateScorecardCard from "../cards/updateScorecardCard";
import ScorecardCreate from "../ScorecardCreate";
import ScorecardNav from "../scorecardNav";
import ViewScorecardCard from "../viewScorecard";
  

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(CASCADED);

    useEffect(() => {
        setActiveComponent(CREATE);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav setActiveComponent={ setActiveComponent } />
            <Outlet setActiveComponent={ setActiveComponent } />
            
        </div>
    )
}

export default ScorecardCont;
