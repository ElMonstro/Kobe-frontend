import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";
import StrategyObjective from "./strategyObjective";

const StrategyMapPerspective = ({ linkableObjectives, objectives, alias }) => {

    return (
        <div className="strategy_map_perspective">
            <div className="header">
                <span className="title">
                    { alias }
                </span>
            </div>
            <div className="body">
                <Row className="title_bar row_design">
                    <Col>
                        <Row>
                            <Col>Objective</Col>
                            <Col>Link</Col>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div className="objectives">
                    {
                        objectives?.map(objective => {
                            return <StrategyObjective 
                                        key={ objective.id } 
                                        objective={objective} 
                                        linkableObjectives={ linkableObjectives } 
                                        perspective={ alias }
                                    />
                        })
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default StrategyMapPerspective;
