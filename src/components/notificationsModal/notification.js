import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAgeString } from "../../utils";

const Notification = ({ title, body, link, is_seen, needs_attention, created_at }) => {
    const navigate = useNavigate();
    let notificationClassName;
    is_seen? notificationClassName = "notification": notificationClassName = "notification unread";
    const ageString = getAgeString(created_at);

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
            (link && needs_attention) &&
            <Button className="link_button" onClick={() => navigate(link)}>
              View Ammendment
            </Button>
          }
        </div>
      </div>
    )
};

export default Notification;
