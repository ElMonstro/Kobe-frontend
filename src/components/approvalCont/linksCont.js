import React from "react";
import { Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { Xwrapper } from "react-xarrows";

import ApprovalLinksView from "./strategyMapLinks";

const ApprovalLinksCont = () => {    

    const { objective, approve, reject} = useOutletContext();
    
    return (
        <div className="links_cont">
            <Xwrapper>
                <ApprovalLinksView { ...objective?.approved_obj } title="Previous Links"/>
                <ApprovalLinksView { ...objective } title="Updated Links"/>
            </Xwrapper>
        </div>
    )
}

export default ApprovalLinksCont;
