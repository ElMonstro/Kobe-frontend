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
            <div className="approval_buttons">
                <Button onClick={ approve } className="response_button approve">Approve Updates</Button>
                <Button onClick={ reject } className="response_button reject">Reject Updates</Button>
            </div>
        </div>
    )
}

export default ApprovalLinksCont;
