import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Modal } from "react-bootstrap";

import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import { fetchNotificationsURL } from "../../services/urls";
import { GET } from "../../utils/constants";
import Notification from "./notification";
import ringingBell from "../../assets/ringingBell.svg";
import { setShowNotifications } from "../../redux/actions";


const NotificationsModal = ({ showNotifications, isLoggedIn, setShowNotifications }) => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        makeRequest(fetchNotificationsURL, GET, null, true, false)
            .then(data => {
                data && setNotifications(data);
            })
    }, [isLoggedIn])

    const handleClose = () => {
        setShowNotifications(false);
    }

    return (
        <div className="notifications">
            <Modal
                show={ showNotifications }
                backdrop="static"
                keyboard={false}
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
    setShowNotifications
}

const mapStateToProps = ({ authReducer: { showNotifications, isLoggedIn } } ) => ({
    showNotifications,
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (NotificationsModal);

