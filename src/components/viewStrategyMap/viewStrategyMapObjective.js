import React from "react";
import Xarrow from "react-xarrows";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

const StrategyMapObjectiveView = ({ id, name, status, links })=> {
    const NAME_LENGTH = 20;
    const fillColorMapper = {
        poor: '#F21212',
        satisfactory: '#FFA800',
        good: '#16C046'
    }

    const color = fillColorMapper[status]; 
    let truncatedName = name.substring(0, Math.min(NAME_LENGTH, name.length))
    truncatedName += "...";

    return (
        <>
            <div className="strategy_map_objective">
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="objective_name">
                            { name }
                        </Tooltip>
          }>
                    <svg height="140" width="243">
                        <g>
                            <ellipse id={ id } cx="120" cy="70" rx="120" ry="50" fill={ color } />
                            <text textLength="180px" 
                                lengthAdjust="spacingAndGlyphs" 
                                className="truncate" 
                                x="30" 
                                y="72" 
                                fontFamily="Verdana" 
                                fontSize="16" 
                                fill="white"
                            > 
                                { truncatedName } 
                            </text>
                        </g>
                    </svg>
                </OverlayTrigger>
            </div>
            {
                links.map(link => {
                                return <Xarrow key={ link.id } start={ id.toString() } end={ link.id.toString() } color="black" />
                            })
            }
        </>
        
    );
};

export default StrategyMapObjectiveView;
