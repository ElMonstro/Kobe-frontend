import React from "react";

import "./index.scss";
import PesrpectiveSwitchForm from "../cards/enablePerspectivesCard";
import BehavioralSwitchForm from "../cards/enableBehavioralsCard";
import EditPerspectivesCard from "../cards/editPerspectiveCard";
import PerspectiveCutoffForm from "../cards/perspectiveCutoff";
import EditPerspectivesWeightCard from "../cards/perspectiveWeightsCard";
import PerspectiveOrderForm from "../cards/perspectiveOrderCard";
import CreateGlobalBehavioral from "../cards/CreateBehavioralCard";

const PerspectivesCont = props => {
    
    return (
        <div className="admin_cont">
            <PesrpectiveSwitchForm { ...props }/>
            <EditPerspectivesCard { ...props }/>
            <PerspectiveOrderForm { ...props}/>
            <BehavioralSwitchForm { ...props }/>
            <EditPerspectivesWeightCard { ...props } />
            <PerspectiveCutoffForm { ...props }/>
            <CreateGlobalBehavioral { ...props }/>
        </div>
    )
}

export default PerspectivesCont;
