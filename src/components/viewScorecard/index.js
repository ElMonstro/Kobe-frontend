import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { fetchPerspectivesURL } from "../../services/urls";
import { GET } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";

import "./index.scss";
import ViewPerspective from "./viewPerspective.";

const ViewScorecard = props => {

    const [perspectives, setPerspective] = useState([])

    useEffect(() => {
        makeRequest(fetchPerspectivesURL, GET, null, true, false)
            .then(data => {
                data && setPerspective(data);
            })
    }, [])
    
    return (
        <div className="view_scorecard">
            <Row className="header">
                    <Col>
                        Name
                    </Col>
                    <Col className="second_half">
                        <Row>
                            <Col> Status </Col>
                            <Col className="measure"> Measure </Col>
                            <Col> Weight </Col>
                            <Col> Target </Col>
                            <Col> Score  </Col>
                            <Col> Perfomance  </Col>
                        </Row>
                    </Col>
            </Row>
            <Card className="staff_card perspectives">
                    {
                        perspectives.map(perspective => {
                            return <ViewPerspective {...perspective} />
                        })
                        
                    }
            </Card>
        </div>
    )
}

export default ViewScorecard;
