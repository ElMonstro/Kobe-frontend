import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { confirm } from "react-bootstrap-confirmation";
import { useOutletContext, useParams } from "react-router-dom";
import { Xwrapper } from "react-xarrows";

import { fetchApprovalObject } from "../../services/urls";
import { LINKS, PATCH } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import RejectionMessageModal from "./rejectionMessageModal";
import ApprovalLinksView from "./strategyMapLinks";

const ApprovalLinksCont = (props) => {    

    const { objective, setActiveComponent } = useOutletContext();
    const { approvalToken } = useParams();
    const [ showRejectionModal, setShowRejectionModal ] = useState(false);

    const approve = async () => {
        const result = await confirm("Are you sure you want to approve?");
        result && makeRequest(fetchApprovalObject(approvalToken), PATCH, { is_approved: true }, true, true);
    }

    const reject = () => setShowRejectionModal(true);
    
    useEffect(() => {
        setActiveComponent(LINKS);
    }, []);

    return (
        <div className="links_cont">
            <RejectionMessageModal showRejectionModal={ showRejectionModal } setShowRejectionModal={ setShowRejectionModal } />
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
