import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { SCORECARD, VIEW } from "../../utils/constants";
import ScorecardNav from "../scorecardNav";  

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(VIEW);
    const { setActiveCompMemberNav } = useOutletContext();

    useEffect(() => {
        setActiveCompMemberNav(SCORECARD);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav activeComponent={ activeComponent } setActiveComponent={ setActiveComponent } />
            <Outlet context={{ setActiveComponent: setActiveComponent } } />
        </div>
    )
}

export default ScorecardCont;
