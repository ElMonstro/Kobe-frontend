import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { confirm } from "react-bootstrap-confirmation";

import "./index.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requestUtils";
import { GET, PATCH } from "../../utils/constants";
import { fetchApprovalObject } from "../../services/urls";
import RejectionMessageModal from "./rejectionMessageModal";


const ApprovalModal = () => {
    const [approvalObject, setApprovalObject] = useState({});
    const [show, setShow] = useState(true);
    const { approvalToken } = useParams();
    const navigate = useNavigate();
    const [ showRejectionModal, setShowRejectionModal ] = useState(false);

    const approve = async () => {
        const result = await confirm("Are you sure you want to approve?");
        result && makeRequest(fetchApprovalObject(approvalToken), PATCH, { is_approved: true }, true, true);
        result && handleClose();
    }

    const reject = () => setShowRejectionModal(true);

    const handleClose = () => {
        navigate(-1);
        setShow(false);
    }

    useEffect(() => {
        makeRequest(fetchApprovalObject(approvalToken), GET, null, true, false)
            .then(approval_Object => {
                approval_Object && setApprovalObject(approval_Object);
            });
    }, []);

    return (
        <div className="approval_modal">
            <RejectionMessageModal showRejectionModal={ showRejectionModal } setShowRejectionModal={ setShowRejectionModal } />

            <Modal
                show={show}
                backdrop="static"
                keyboard={true}
                fullscreen
                // aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="approval_modal"
                contentClassName="approval_model_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>{ `Level ${approvalObject.approval_count} ${approvalObject.change_approval_tracker?.type}` } approval</Modal.Title>
                </Modal.Header>
                <Modal.Body className="approval_modal_body">
                    <Outlet context={ { 
                        objective: approvalObject?.change_approval_tracker?.objective,
                        evidence: approvalObject?.change_approval_tracker?.evidence,
                        approve,
                        reject,
                        } } 
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ApprovalModal;
