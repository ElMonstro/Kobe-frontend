import React from "react";
import { Col, Row } from "react-bootstrap";
import { Xwrapper } from "react-xarrows";

import "./index.scss";
import StrategyMapObjectiveView from "./viewStrategyMapObjective";


const StrategyMapPerspectiveView = ({ objectives, perspective }) => {

    return (
        <Row className="strategy_view_perspective">
            <Col className="name_container" lg="1">
                <div className="name">
                    <span>
                        { perspective }
                    </span>
                </div>
                
            </Col>
            <Col>
                    <Row className="objectives">
                        { 
                            objectives?.map(objective => {
                                if (objective.perspective !== perspective) {
                                    return null
                                }
                                return <StrategyMapObjectiveView key={ objective.id } { ...objective }/>
                        })}
                    </Row>
            </Col>
        </Row>
    )
}

export default StrategyMapPerspectiveView;
