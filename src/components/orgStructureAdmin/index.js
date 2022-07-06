import React from "react";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";


import "./index.scss";
import ThresholdsForm from "../cards/threshholdsCard";

const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_org_cont">
            <UploadLogoCard />
            <MissionVisionForm />
            <UploadOrgCard />
            <DivisionsNamesForm />
            <ThresholdsForm />

        </div>
    )
}

export default AdminOrgStructureCont;
