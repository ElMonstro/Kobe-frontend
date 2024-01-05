import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import getURLs from "../../services/urls";
import { CREATE, GET } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import StrategyMapPerspective from "./strategyPerspective";
import { connect } from "react-redux";

const StrategyMapCreate = ({ perspectiveOrder }) => {

    const [perspectives, setPerspectives] = useState([]);
    let linkableObjectives;
    let abovePerspective;
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(CREATE);
        makeRequest(getURLs().fetchStrategyMapPerspectivesURL, GET, null, true, false)
            .then(data => {
                data && setPerspectives(data);
            })
    }, []);


    return (
        <div className="strategy_map_create">
            {
                perspectives?.map((perspective, index) => {
                    abovePerspective = perspectives[index - 1];
                    linkableObjectives = abovePerspective?.objectives
                    
                    return <StrategyMapPerspective 
                            key={ perspective.id } linkableObjectives={ linkableObjectives }
                            { ...perspective }
                         />
                })
                
            }
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({adminReducer: { perspectiveOrder }}) => ({
    perspectiveOrder,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StrategyMapCreate);

