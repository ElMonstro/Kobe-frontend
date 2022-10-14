import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { VIEW } from "../../utils/constants";
import StrategyMapNav from "../strategyMapNav";

import "./index.scss";

const StrategyMapCont = props => {

    const [activeComponent, setActiveComponent] = useState(VIEW);

    useEffect(() => {
        setActiveComponent(VIEW);
    }, []);
    
    return (
        <div className="strategy_map_cont">
            <StrategyMapNav activeComponent={ activeComponent } setActiveComponent={ setActiveComponent } />
            <Outlet setActiveComponent={ setActiveComponent } />
        </div>
    )
}

export default StrategyMapCont;
