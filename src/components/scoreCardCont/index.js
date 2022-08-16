import React, { useState } from "react";
import { OVER_VIEW, SCORECARD } from "../../utils/constants";
import MemberNavCard from "../cards/MemberNavCard";

import "./index.scss";

const ScoreCardCont = props => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);
    
    return (
        <div className="scorecard_cont">
            <MemberNavCard 
                activeComponent={ activeComponent } 
                setActiveComponent={ setActiveComponent }
            />
    
        </div>
    )
}

export default ScoreCardCont;

