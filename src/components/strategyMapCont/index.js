import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { STRATEGY_MAP, VIEW } from "../../utils/constants";
import StrategyMapNav from "../strategyMapNav";

import "./index.scss";

const StrategyMapCont = props => {
    
    const [activeComponent, setActiveComponent] = useState(VIEW);
    const { setActiveCompMemberNav } = useOutletContext();

    useEffect(() => {
        setActiveCompMemberNav(STRATEGY_MAP);
        setActiveComponent(VIEW);
    }, []);
    
    return (
        <div className="strategy_map_cont">
            <StrategyMapNav activeComponent={ activeComponent } setActiveComponent={ setActiveComponent } />
            <Outlet context={{ setActiveComponent: setActiveComponent } } />
        </div>
    )
}

export default StrategyMapCont;
