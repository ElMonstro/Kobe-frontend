import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import "./index.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requestUtils";
import { GET, PATCH } from "../../utils/constants";
import getURLs from "../../services/urls";
import RejectionMessageModal from "./rejectionMessageModal";
import DialogBox from "../common/dialogBox";


const ApprovalModal = () => {
    const [approvalObject, setApprovalObject] = useState({});
    const [show, setShow] = useState(true);
    const { approvalToken } = useParams();
    const navigate = useNavigate();
    const [ showRejectionModal, setShowRejectionModal ] = useState(false);
    const [showApprovalDialog, setApprovalDialog] = useState(false);

    const approveRequest = () => {
        makeRequest(getURLs().fetchApprovalObject(approvalToken), PATCH, { is_approved: true }, true, true);
        handleClose();
    }
    const approve = async () => {
        setApprovalDialog(true);
    }

    const reject = () => setShowRejectionModal(true);

    const handleClose = () => {
        navigate(-1);
        setShow(false);
    }

    useEffect(() => {
        makeRequest(getURLs().fetchApprovalObject(approvalToken), GET, null, true, false)
            .then(approval_Object => {
                approval_Object && setApprovalObject(approval_Object);
            });
    }, []);

    return (
        <div className="approval_modal">
            <DialogBox
                showDialog={showApprovalDialog}
                confirm={approveRequest}
                cancel={()=> {setApprovalDialog(false)}}
                title={'Info'}
                message={'Approval Modal'}
                prompt={'Are you sure you want to approve?'}
            />
            <RejectionMessageModal 
                showRejectionModal={ showRejectionModal } 
                setShowRejectionModal={ setShowRejectionModal }   
                closeApprovalModal={ handleClose } 
            />

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
                        } } 
                    />
                    <div className="approval_buttons">
                        <Button onClick={ approve } className="response_button approve">Approve</Button>
                        <Button onClick={ reject } className="response_button reject">Reject</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ApprovalModal;
