import React from "react";
import CascadedCard from "./cascadedCard";

import "./index.scss";

const CascadedCards = props => {
    
    return (
        <div className="">
            <CascadedCard {...props} type="cascaded" title="Cascaded objectives" />
            <CascadedCard {...props}  type="selfCascaded" title="Self cascaded initiatives" />
        </div>
    );
}

export default CascadedCards;
