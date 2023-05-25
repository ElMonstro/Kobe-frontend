import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { fetchStrategyMapObjectivesURL } from "../../services/urls";
import { CREATE, GET } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import StrategyMapPerspective from "./strategyPerspective";
import { connect } from "react-redux";

const StrategyMapCreate = ({ perspectiveOrder }) => {

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

// TODO use alias names instead of perspective names


    return (
        <div className="strategy_map_create">
            {
                perspectiveOrder?.map((perspective, index) => {
                    perspectiveObjectives = objectives.filter(objective => objective?.perspective.toLowerCase() === perspective )
                    linkableObjectives = objectives.filter(objective => {
                        if (index === 0) {
                          return objective?.perspective === perspective;
                        }
                        abovePerspective = perspective[index - 1];
                        return objective?.perspective.toLowerCase() === perspective || objective?.perspective.toLowerCase() === abovePerspective;
                    });
                    
                    return <StrategyMapPerspective 
                            key={ perspective } linkableObjectives={ linkableObjectives }
                            perspectiveObjectives={ perspectiveObjectives } perspective={ perspective }
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

