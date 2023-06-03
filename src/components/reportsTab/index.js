import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { REPORTS } from "../../utils/constants";

import "./index.scss";

const ReportsTab = () => {
       
    const { setActiveCompMemberNav } = useOutletContext();
    const [path, setPath] = useState([REPORTS ])
    const navigate = useNavigate()
    const { role } = useParams();

    useEffect(() => {
        setActiveCompMemberNav(REPORTS);
    }, []);

    const handlePathClick = () => {
        navigate(`/${role}/${REPORTS}`);
        setPath([REPORTS]);
    }

    return (
        <div className="reports_tab">
            <div className="path">
                {path[1] && <span className="home" onClick={() => handlePathClick()}> 
                    { path[0] } &nbsp;
                    </span> 
                }

                {
                    path.slice(1).map((pathString, index )=> 
                            <span className="path_string" onClick={() => handlePathClick(pathString)}> 
                                &gt; {pathString} &nbsp;
                            </span>
                        )
                }
            </div>
            <Outlet context={ {setReportPath: setPath} } />
        </div>
    )
};


export default ReportsTab