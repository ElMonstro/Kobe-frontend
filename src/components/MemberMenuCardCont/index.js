import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { OVER_VIEW, SCORECARD } from "../../utils/constants";
import MemberNavCard from "../cards/MemberNavCard";
import ScorecardCont from "../scorecardCont";

import "./index.scss";

const MemberMenuCont = props => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);
    
    return (
        <div className="members_nav_cont">
            <MemberNavCard 
                activeComponent={ activeComponent } 
                setActiveComponent={ setActiveComponent }
            />
            <Outlet />
        </div>
    )
}

export default MemberMenuCont;

