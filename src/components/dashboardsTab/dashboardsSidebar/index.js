import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { fetchPerspectivesURL } from "../../../services/urls";
import { GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import "./index.scss";
import ViewSidebarPerspective from "./viewSidebarPerspective";
import overallIcon from "../../../assets/overallPerfomance.svg";


const DashboardsSidebar = () => {

    const [perspectives, setPerspectives] = useState([])
    const { role } = useParams();
    const [spinnerState, setSpinnerState] = useState(true);

    useEffect(() => {
        setSpinnerState(true);
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                perspectives && setPerspectives(perspectives);
            });
        setSpinnerState(false);
    }, [role])
    
    return (
        <div className="dashboards_sidebar">
            <div className="overall_perfomance">
            <img className="icon" src={ overallIcon } alt="icon" />
                Overall perfomance
            </div>
            {
                spinnerState? <Spinner className="spinner" animation="grow"/>:
                <Card className="staff_card perspectives">
                    {
                        perspectives.map(perspective => {
                            return <ViewSidebarPerspective key={ perspective.id } { ...perspective } />
                        })
                        
                    }
                </Card>
            }
        </div>
    )
}

export default DashboardsSidebar;
