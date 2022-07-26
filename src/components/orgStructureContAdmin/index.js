import React from "react";

import "./index.scss";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";
import ThresholdsForm from "../cards/threshholdsCard";
import OrgChartCard from "../cards/orgCard";
import LoginForm from "../modals/loginModal";


const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_cont">
            <UploadLogoCard { ...props }/>
            <MissionVisionForm { ...props }/>
            <UploadOrgCard { ...props }/>
            <LoginForm { ...props }/>
            <OrgChartCard { ...props }/>
            <DivisionsNamesForm { ...props }/>
            <ThresholdsForm { ...props }/>
        </div>
    )
}

export default AdminOrgStructureCont;
