import React, { useState } from "react";

import "./index.scss";
import MissionVisionForm from "../cards/missionVisonCard";
import UploadLogoCard from "../cards/uploadLogoCard";
import UploadOrgCard from "../cards/uploadOrgCard";
import DivisionsNamesForm from "../cards/orgNamesCard";
import ThresholdsForm from "../cards/threshholdsCard";
import OrgChartCard from "../cards/orgCard";


const AdminOrgStructureCont = props => {

    const [orgChartSpinner, setOrgChartSpinner] = useState(false);
    
    return (
        <div className="admin_cont">
            <UploadLogoCard { ...props }/>
            <MissionVisionForm { ...props }/>
            <UploadOrgCard 
                setOrgChartSpinner={ setOrgChartSpinner }
                settings={props.settings}
                />
            <OrgChartCard 
                spinnerState={ orgChartSpinner }
                { ...props }
            />
            <DivisionsNamesForm { ...props }/>
            <ThresholdsForm { ...props }/>
        </div>
    )
}

export default AdminOrgStructureCont;
