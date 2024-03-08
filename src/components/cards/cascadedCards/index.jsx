import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CASCADED } from "../../../utils/constants";
import CascadedCard from "./cascadedCard";

import "./index.scss";
import { connect } from "react-redux";

const CascadedCards = (props) => {

    const { setActiveComponent } = useOutletContext();
    const { role, settings } = props;
    const [cascadedTitle, setTitle] = useState("");

    useEffect(() => {
        let objectivesTitle;
        role?.is_ceo || role?.tier > settings?.cascade_cutoff ? 
        objectivesTitle = "Created Objectives" : objectivesTitle = "Cascaded Objectives";
        setTitle(objectivesTitle);

    }, [role, settings]);

    useEffect(() => {
        setActiveComponent(CASCADED)
    }, []);

    
    return (
        <div className="">
            <CascadedCard {...props} type="cascaded" title={ cascadedTitle } />
            <CascadedCard {...props}  type="selfCascaded" title="Self cascaded initiatives" />
        </div>
    );
}

const mapStateToProps = ({adminReducer: { orgChart, settings }} )=> ({
    role: orgChart[0],
    settings
})

export default connect(mapStateToProps)(CascadedCards);
