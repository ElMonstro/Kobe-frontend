import React from "react";
import {connect} from 'react-redux';
import { Modal } from "react-bootstrap";

import "./index.scss";
import Notification from "./notification";
import ringingBell from "../../assets/ringingBell.svg";
import { setShowNotifications, setNotifications } from "../../redux/actions";
import { makeRequest } from "../../utils/requestUtils";
import { setSeenNotificationsURL } from "../../services/urls";
import { POST } from "../../utils/constants";


const NotificationsModal = ({ showNotifications, setShowNotifications, notifications, setNotifications }) => {

    const handleClose = () => {
        setShowNotifications(false);
        renderedUnseenNotifIds.length > 0 && 
            makeRequest(setSeenNotificationsURL, POST, { notifications: renderedUnseenNotifIds }, true, false);
        setNotifications(renderedNotifications);
    }

    const renderedUnseenNotifIds = [];
    const renderedNotifications = [];

    return (
        <div className="notifications">
            <Modal
                show={ showNotifications }
                backdrop="static"
                keyboard={true}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="notifications_modal"
                contentClassName="notifications_modal_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    <div className="ringing_bell">
                        <img src={ ringingBell } alt="" />
                    </div>
                    <Modal.Title className="header_title">Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body className="notifications_modal_body">
                    <div className="notifications">
                        {
                            notifications?.map(notification => {
                                !notification.is_seen && renderedUnseenNotifIds.push(notification.id);
                                renderedNotifications.push({ ...notification, is_seen: true })
                                return <Notification key={ notification.id } {...notification} />
                            })
                        }
                    </div>
        
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    setShowNotifications,
    setNotifications
}

const mapStateToProps = ({ authReducer: { showNotifications, notifications } } ) => ({
    showNotifications,
    notifications
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (NotificationsModal);

