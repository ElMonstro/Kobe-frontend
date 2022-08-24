import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

import "./index.scss";

const CascadedCards = props => {
    
    return (
        <div className="">
            <Card className="staff_card cascaded_initiatives">
                <div className="card_title title">Cascaded objectives</div>
                    <div className="initiatives">
                        <Row className="initiative">
                            <Col lg={3}>
                                Increase revenue
                            </Col>

                            <Col lg={7}>
                            
                            </Col>
                    
                            <Col>
                                <Button className="action_btn create">
                                    Create
                                </Button>
                            </Col>
                        </Row>

                        <Row className="initiative">
                            <Col lg={3}>
                                Increase profitability
                            </Col>

                            <Col lg={7}>
                            
                            </Col>
                    
                            <Col>
                                <Button className="action_btn edit">
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </div>
            </Card>

            <Card className="staff_card cascaded_initiatives">
                <div className="card_title title">Self cascaded initiatives</div>
                    <div className="initiatives">
                        <Row className="initiative">
                            <Col lg={3}>
                                Increase customer turnaround
                            </Col>

                            <Col lg={7}>
                            
                            </Col>
                    
                            <Col>
                                <Button className="action_btn edit">
                                    Edit
                                </Button>
                            </Col>
                        </Row>

                        <Row className="initiative">
                            <Col lg={3}>
                                Increase capital
                            </Col>

                            <Col lg={7}>
                            
                            </Col>
                    
                            <Col>
                                <Button className="action_btn edit">
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </div>
            </Card>
        </div>
    );
}


export default CascadedCards;
