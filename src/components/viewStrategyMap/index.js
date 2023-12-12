import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Xwrapper } from "react-xarrows";
import getURLs from "../../services/urls";
import { GET, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";

import StrategyMapPerspectiveView from "./viewStrategyPerspective";
import { connect } from "react-redux";


const StrategyMapView = ({ perspectiveOrder }) => {

    const [perspectives, setPerspectives] = useState([]);
    const { setActiveComponent } = useOutletContext();
    
    useEffect(() => {
        setActiveComponent(VIEW);
        makeRequest(getURLs().fetchStrategyMapPerspectivesURL, GET, null, true, false)
            .then(data => {
                data && setPerspectives(data);
            })
    }, []);

    return (
        <div className="strategy_map_view">
            <Xwrapper>
                {
                    perspectives.map(perspective => {
                        return <StrategyMapPerspectiveView 
                                    key={ perspective.id } 
                                    { ...perspective }
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
