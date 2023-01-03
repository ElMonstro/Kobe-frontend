import React from "react";
import {connect} from 'react-redux';
import { Col, Modal, Row } from "react-bootstrap";

import "./index.scss";
import ProfileForm from "./profileForm";
import ProfilePicUpload from "./profilePicUpload";
import accountIcon from "../../../assets/accountIcon.png";
import { setShowProfile } from "../../../redux/actions";


const ProfileModal = ({ showProfile, setShowProfile }) => {

    const handleClose = () => {
        setShowProfile(false);
    }

    return (
        <div className="profile">
            <Modal
                show={ showProfile }
                backdrop="static"
                keyboard={ true }
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="profile_modal"
                contentClassName="profile_modal_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    
                    <Modal.Title className="profile_header">
                        <img alt="A" src={ accountIcon } />
                        <span>Account</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="profile_modal_body">
                    <Row>
                        <Col lg="3" className="left_col">
                            <ProfilePicUpload />
                        </Col>
                        <Col lg="5">
                            <ProfileForm />
                        </Col>
                    </Row>
        
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    setShowProfile
}

const mapStateToProps = ({ authReducer: { showProfile } } ) => ({
    showProfile,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ProfileModal);
