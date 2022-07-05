import React from "react";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogo";

import "./index.scss";

const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_org_cont">
            <UploadLogoCard />
            <MissionVisionForm />
        </div>
    )
}

export default AdminOrgStructureCont;
