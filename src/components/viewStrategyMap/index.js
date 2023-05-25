import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Xwrapper } from "react-xarrows";
import { fetchStrategyMapObjectivesURL } from "../../services/urls";
import { GET, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";

import StrategyMapPerspectiveView from "./viewStrategyPerspective";
import { connect } from "react-redux";


const StrategyMapView = ({ perspectiveOrder }) => {

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
                    perspectiveOrder.map(perspective => {
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

const mapDispatchToProps = {
}

const mapStateToProps = ({adminReducer: { perspectiveOrder }}) => ({
    perspectiveOrder,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StrategyMapView);
