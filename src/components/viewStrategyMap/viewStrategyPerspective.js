import React from "react";
import { Col, Row } from "react-bootstrap";

import "./index.scss";
import StrategyMapObjectiveView from "./viewStrategyMapObjective";


const StrategyMapPerspectiveView = ({ objectives, alias }) => {

    return (
        <Row className="strategy_view_perspective">
            <Col className="name_container" lg="1">
                <div className="name">
                    <span>
                        { alias }
                    </span>
                </div>
                
            </Col>
            <Col>
                <Row className="objectives">
                    { 
                        objectives?.map(objective => {
                            return <StrategyMapObjectiveView key={ objective.id } { ...objective }/>
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default StrategyMapPerspectiveView;
