import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import "./index.scss";
import ViewSidebarPerspective from "./viewSidebarPerspective";
import overallIcon from "../../../assets/overallPerfomance.svg";
import { OVERALL, PERSPECTIVE_OBJECT } from "../../../utils/constants";
import { connect } from "react-redux";

const DashboardsSidebar = ({ perspectives, settings }) => {
    
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
                            if (perspective.name === PERSPECTIVE_OBJECT.behavioral_name && !settings.behaviorals_enabled) return;
                            return <ViewSidebarPerspective title="perspectives" key={ perspective.id } { ...perspective } />
                        })
                    }
                </Card>
            }
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { settings }, }) => ({
    settings,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (DashboardsSidebar);
