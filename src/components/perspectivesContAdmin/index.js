import React from "react";

import "./index.scss";
import PesrpectiveSwitchForm from "../cards/enablePerspectivesCard";
import BehavioralSwitchForm from "../cards/enableBehavioralsCard";
import EditPerspectivesCard from "../cards/editPerspectiveCard";
import PerspectiveCutoffForm from "../cards/perspectiveCutoff";

const PerspectivesCont = props => {
    
    return (
        <div className="admin_cont">
            <PesrpectiveSwitchForm />
            <EditPerspectivesCard />
            <BehavioralSwitchForm />
            <PerspectiveCutoffForm />
        </div>
    )
}

export default PerspectivesCont;
