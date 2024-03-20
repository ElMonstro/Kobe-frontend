import React from "react";
import { Button, Card } from "react-bootstrap";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";
import SecurityConfirmationModal from "../../modals/securityConfirmationModal";

import "./index.scss";
import { useParams } from "react-router-dom";

const SendInvitationsCard = ({ settings, setShowConfirmationModal } ) => {
    const { companyId } = useParams();
    const sendEmails = async () => {
        return makeRequest(getURLs().adminInitCompany(companyId), PATCH, {}, true, true, "Emails Sent");
    }

    return (
        <Card className="admin_card send_emails">
            <SecurityConfirmationModal action={ sendEmails }/>
            <div className="card_cont">
                <div className="card_title">
                    Send Invitations
                </div>
                <div className="send_descript">
                    You are sending emails to 
                    <span className="members"> { settings?.users } members </span>
                </div>
                <Button disabled={ settings?.are_emails_sent } className="card_btn" onClick={() => setShowConfirmationModal(true)} >
                    Send Invitations
                </Button>
            </div>
        </Card>
    )
};


export default SendInvitationsCard;
