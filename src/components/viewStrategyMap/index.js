import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Xwrapper } from "react-xarrows";
import { fetchStrategyMapObjectivesURL } from "../../services/urls";
import { GET, PERSPECTIVES_ORDER_ARRAY, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";

import StrategyMapPerspectiveView from "./viewStrategyPerspective";


const StrategyMapView = props => {

    const [objectives, setObjectives] = useState([]);
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(VIEW);
        makeRequest(fetchStrategyMapObjectivesURL, GET, null, true, false)
            .then(data => {
                data && setObjectives(data);
            })
    }, []);

    return (
        <div className="strategy_map_view">
            <Xwrapper>
                {
                    PERSPECTIVES_ORDER_ARRAY.map(perspective => {
                        return <StrategyMapPerspectiveView 
                                    key={ perspective } 
                                    objectives={ objectives } 
                                    perspective={ perspective }
                                />
                    })
                } 
            </Xwrapper>
        </div>
    )
}

export default StrategyMapView;
