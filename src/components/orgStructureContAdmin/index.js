import React from "react";

import "./index.scss";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";
import ThresholdsForm from "../cards/threshholdsCard";


const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_cont">
            <UploadLogoCard />
            <MissionVisionForm />
            <UploadOrgCard />
            <DivisionsNamesForm />
            <ThresholdsForm />
        </div>
    )
}

export default AdminOrgStructureCont;
