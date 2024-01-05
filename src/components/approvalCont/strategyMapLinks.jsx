import React from "react";
import { Col, Row } from "react-bootstrap";

import StrategyMapObjectiveView from "../viewStrategyMap/viewStrategyMapObjective";

const ApprovalLinksView = ({ id, name, status, links, title }) => {    

    return (
        <div className="view_links">
            <div className="links_header">{ title }</div>
            <Row className="links">
                <Col className="objective" lg={ 2 }>
                    <StrategyMapObjectiveView 
                        key={ id } 
                        id={ id } 
                        name={ name } 
                        status={ status } 
                        links={ links }
                    />
                </Col>
                <Col>
                    <Row>
                        { 
                            links?.map(link => {
                                return <StrategyMapObjectiveView 
                                            key={ link.id } 
                                            id={ link.id } 
                                            name={ link.name } 
                                            status={ link.status } 
                                            links={ null }
                                        />
                        })}
                    </Row>
                </Col>
            </Row>
            
            
        </div>
    )
}

export default ApprovalLinksView;
