import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import "./index.scss";
import ViewSidebarPerspective from "./viewSidebarPerspective";
import overallIcon from "../../../assets/overallPerfomance.svg";


const DashboardsSidebar = ({ perspectives }) => {
    
    return (
        <div className="dashboards_sidebar">
            <div className="overall_perfomance">
            <img className="icon" src={ overallIcon } alt="icon" />
                Overall perfomance
            </div>
            {
                <Card className="staff_card perspectives">
                    {
                        perspectives?.map(perspective => {
                            return <ViewSidebarPerspective key={ perspective.id } { ...perspective } />
                        })
                        
                    }
                </Card>
            }
        </div>
    )
}

export default DashboardsSidebar;
