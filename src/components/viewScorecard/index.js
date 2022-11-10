import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";

import { fetchPerspectivesURL } from "../../services/urls";
import { GET, SCORECARD, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import ViewPerspective from "./viewPerspective";
import ObjectivesHeader from "./viewScorecardHeader";

const ViewScorecard = () => {

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
            <ObjectivesHeader mode={ SCORECARD } />
            
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
