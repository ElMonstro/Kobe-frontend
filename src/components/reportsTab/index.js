import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { REPORTS } from "../../utils/constants";

import "./index.scss";

const ReportsTab = () => {
       
    const { setActiveCompMemberNav } = useOutletContext();

    useEffect(() => {
        setActiveCompMemberNav(REPORTS);
    }, []);

    return (
        <div className="reports_tab">
            <Outlet />
        </div>
    )
};


export default ReportsTab