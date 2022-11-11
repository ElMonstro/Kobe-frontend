import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Notification = ({ title, body, link, is_seen, needs_attention }) => {
    const navigate = useNavigate();
    let notificationClassName;
    is_seen? notificationClassName = "notification": notificationClassName = "notification unread";
    
    return (
      <div className={ notificationClassName }>
        <div className="blue_circle_cont">
          <div className="blue_circle"></div>
        </div>
        <div className="content">
          <span className="title">{ title }</span>
          <div className="body">{ body }</div>
          { 
            (link && needs_attention) &&
            <Button className="link_button" onClick={() => navigate(link)}>
              Go to Link
            </Button>
          }
        </div>
      </div>
    )
};

export default Notification;
