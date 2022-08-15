import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CASCADE } from "../../utils/constants";

import './index.scss';


const StaffSidebar = props => {

    return (
        <div className="staff_sidebar">
            <div className="sidebar_cont">
                <div className="title">
                    ORGANIZATION CHART
                </div>
            </div>
        </div>
    )
}

export default StaffSidebar
