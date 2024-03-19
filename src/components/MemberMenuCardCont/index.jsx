import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { SCORECARD, UPDATE } from "../../utils/constants";
import MemberNavCard from "../cards/MemberNavCard";

import "./index.scss";
import { connect } from "react-redux";
import BoardMessage from "./boardMessage";
import { setCurrentRole } from "../../redux/actions";
import { isObjectEmpty, searchOrgChart } from "../../utils";

const MemberMenuCont = ({ currentRole, orgChart, setCurrentRole }) => {

    const [activeComponent, setActiveComponent] = useState(SCORECARD);
    const { role } = useParams();

    useEffect(() => {
        if (isObjectEmpty(currentRole) && orgChart.length === 1 && orgChart[0]) {
            const gottenRole = searchOrgChart(orgChart, role);
            setCurrentRole(gottenRole);
        }
      }, [orgChart]);
    
    return (
        <div className="members_container">
            { currentRole?.permissions === UPDATE ? 
                <>
                    <div className="members_nav_cont">
                        <MemberNavCard 
                        activeComponent={ activeComponent } 
                            setActiveComponent={ setActiveComponent }
                        />
                    </div>
                    
                    <div className="members_content">
                        <Outlet context={ { setActiveCompMemberNav: setActiveComponent }}/>
                    </div>
                </>
            : <BoardMessage currentRole={ currentRole } />}
        </div>
    )
}

const mapDispatchToProps = {
    setCurrentRole
}

const mapStateToProps = ({ authReducer: { currentRole }, adminReducer: { orgChart }  }) => ({
    currentRole,
    orgChart
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (MemberMenuCont);
