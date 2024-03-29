import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getTimeDifference } from "../../utils";

const Notification = ({ title, body, link, is_seen, needs_attention, created_at, setShowNotifications }) => {
    const navigate = useNavigate();
    let notificationClassName;
    is_seen? notificationClassName = "notification": notificationClassName = "notification unread";
    const isRejectionNotification =  title.includes("rejected");
    const ageString = getTimeDifference(created_at);
    const [showButton, setShowButton] = useState((link && needs_attention) || isRejectionNotification);

    const handleNotificationClick = () => {
      navigate(link);
      setShowButton(false);

      isRejectionNotification && setShowNotifications(false);
      
    }

    return (
      <div className={ notificationClassName }>
        <div className="blue_circle_cont">
          <div className="blue_circle"></div>
        </div>
        <div className="content">
          <span className="notification_header">
            <span className="title">{ title }</span>
            <span className="time">{ ageString }</span>
          </span>
          <div className="body">{ body }</div>
          { 
            (showButton) &&
            <Button className={`link_button ${isRejectionNotification && 'edit'}`} onClick={ handleNotificationClick }>
              {isRejectionNotification ? "Edit" : "View"} Objective
            </Button>
          }
        </div>
      </div>
    )
};

export default Notification;
