import React from "react";
import SendInvitationsCard from "../cards/SendEmailsCard";


const SendEmailCont = props => {
    
    return (
        <div className="admin_cont">
            <SendInvitationsCard {...props} />
        </div>
    )
}

export default SendEmailCont;
