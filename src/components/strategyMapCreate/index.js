import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { fetchStrategyMapObjectivesURL } from "../../services/urls";
import { CREATE, GET, PERSPECTIVES_ORDER_ARRAY } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import StrategyMapPerspective from "./strategyPerspective";

const StrategyMapCreate = props => {

    const [objectives, setObjectives] = useState([]);
    let perspectiveObjectives;
    let linkableObjectives;
    let abovePerspective;
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(CREATE);
        makeRequest(fetchStrategyMapObjectivesURL, GET, null, true, false)
            .then(data => {
                data && setObjectives(data);
            })
    }, []);

    return (
        <div className="strategy_map_create">
            {
                PERSPECTIVES_ORDER_ARRAY.map((perspective, index) => {
                    perspectiveObjectives = objectives.filter(objective => objective?.perspective.toLowerCase() === perspective )
                    linkableObjectives = objectives.filter(objective => {
                        if (index === 0) {
                          return objective?.perspective === perspective;
                        }
                        abovePerspective = PERSPECTIVES_ORDER_ARRAY[index - 1];
                        return objective?.perspective.toLowerCase() === perspective || objective?.perspective.toLowerCase() === abovePerspective;
                    });
                    
                    return <StrategyMapPerspective key={ perspective } linkableObjectives={ linkableObjectives } perspectiveObjectives={ perspectiveObjectives } perspective={ perspective }/>
                })
                
            }
        </div>
    )
}

export default StrategyMapCreate;
