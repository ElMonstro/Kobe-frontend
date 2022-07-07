import React from "react";

import "./index.scss";
import PesrpectiveSwitchForm from "../cards/enablePerspectivesCard";
import BehavioralSwitchForm from "../cards/enableBehavioralsCard";
import EditPerspectivesCard from "../cards/editPerspectiveCard";

const PerspectivesCont = props => {
    
    return (
        <div className="admin_cont">
            <PesrpectiveSwitchForm />
            <EditPerspectivesCard />
            <BehavioralSwitchForm />
        </div>
    )
}

export default PerspectivesCont;
