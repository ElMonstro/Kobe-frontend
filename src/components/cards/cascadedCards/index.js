import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CASCADED } from "../../../utils/constants";
import CascadedCard from "./cascadedCard";

import "./index.scss";

const CascadedCards = props => {

    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(CASCADED)
    }, [])
    
    return (
        <div className="">
            <CascadedCard {...props} type="cascaded" title="Cascaded objectives" />
            <CascadedCard {...props}  type="selfCascaded" title="Self cascaded initiatives" />
        </div>
    );
}

export default CascadedCards;
