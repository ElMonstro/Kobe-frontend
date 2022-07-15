import React from "react";

import "./index.scss";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";
import ThresholdsForm from "../cards/threshholdsCard";
import OrgChartCard from "../cards/orgCard";


const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_cont">
            <UploadLogoCard />
            <MissionVisionForm />
            <UploadOrgCard />
            
            <OrgChartCard />
            <DivisionsNamesForm />
            <ThresholdsForm />
        </div>
    )
}

export default AdminOrgStructureCont;
