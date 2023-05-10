import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SCORECARD } from "../../utils/constants";
import MemberNavCard from "../cards/MemberNavCard";

import "./index.scss";

const MemberMenuCont = props => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);
    
    return (
        <div className="members_container">
            <div className="members_nav_cont">
                <MemberNavCard 
                    activeComponent={ activeComponent } 
                    setActiveComponent={ setActiveComponent }
                />
            </div>
            
            <div className="members_content">
                <Outlet context={ { setActiveCompMemberNav: setActiveComponent }}/>
            </div>
        </div>
    )
}

export default MemberMenuCont;

