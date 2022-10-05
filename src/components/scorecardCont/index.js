import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { VIEW } from "../../utils/constants";
import ScorecardNav from "../scorecardNav";  

import "./index.scss";

const ScorecardCont = props => {

    const [activeComponent, setActiveComponent] = useState(VIEW);

    useEffect(() => {
        setActiveComponent(VIEW);
    }, []);
    
    return (
        <div className="scorecard_cont">
            <ScorecardNav activeComponent={ activeComponent } setActiveComponent={ setActiveComponent } />
            <Outlet />
        </div>
    )
}

export default ScorecardCont;
