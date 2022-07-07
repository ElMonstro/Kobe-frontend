import React from "react";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";


import "./index.scss";
import ThresholdsForm from "../cards/threshholdsCard";
import PesrpectiveSwitchForm from "../cards/enablePerspectivesCard";
import BehavioralSwitchForm from "../cards/enableBehavioralsCard";
import CascadeCutoffForm from "../cards/cascadeCutoffCard";
import ReviewPeriodCard from "../cards/reviewPeriodCard";
import EditPerspectivesCard from "../cards/editPerspectiveCard";

const AdminOrgStructureCont = props => {
    
    return (
        <div className="admin_org_cont">
            <EditPerspectivesCard />
            <UploadLogoCard />
            <MissionVisionForm />
            <UploadOrgCard />
            <DivisionsNamesForm />
            <ThresholdsForm />
            <PesrpectiveSwitchForm />
            <BehavioralSwitchForm />
            <CascadeCutoffForm />
            <ReviewPeriodCard />

        </div>
    )
}

export default AdminOrgStructureCont;
