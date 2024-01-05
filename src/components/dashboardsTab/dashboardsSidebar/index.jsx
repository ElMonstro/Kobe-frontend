import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import ViewSidebarPerspective from "./viewSidebarPerspective";
import overallIcon from "../../../assets/overallPerfomance.svg";
import { OVERALL } from "../../../utils/constants";

const DashboardsSidebar = ({ perspectives }) => {
    
    const navigate = useNavigate();
    return (
        <div className="dashboards_sidebar">
            <div className="overall_perfomance" onClick={() => navigate(OVERALL)}>
            <img className="icon" src={ overallIcon } alt="icon" />
                Overall perfomance
            </div>
            {
                <Card className="staff_card perspectives">
                    {
                        perspectives?.map(perspective => {
                            return <ViewSidebarPerspective title="perspectives" key={ perspective.id } { ...perspective } />
                        })
                    }
                </Card>
            }
        </div>
    )
}

export default DashboardsSidebar
