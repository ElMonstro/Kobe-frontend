import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";

import { fetchPerspectivesURL } from "../../services/urls";
import { GET, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import ViewPerspective from "./viewPerspective";

const ViewScorecard = props => {

    const [perspectives, setPerspectives] = useState([])
    const { role } = useParams();
    const [spinnerState, setSpinnerState] = useState(true);
    const { setActiveComponent } = useOutletContext();

    useEffect(() => {
        setActiveComponent(VIEW);
        setSpinnerState(true);
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                perspectives && setPerspectives(perspectives);
            });
        setSpinnerState(false);
    }, [role])
    
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
            {
                spinnerState? <Spinner className="spinner" animation="grow"/>:
                <Card className="staff_card perspectives">
                    {
                        perspectives.map(perspective => {
                            return <ViewPerspective key={ perspective.id } { ...perspective } />
                        })
                        
                    }
                </Card>
            }
        </div>
    )
}

export default ViewScorecard;
