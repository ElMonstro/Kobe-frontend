import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { confirm } from "react-bootstrap-confirmation";

import "./index.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requestUtils";
import { GET, PATCH } from "../../utils/constants";
import { fetchApprovalObject } from "../../services/urls";
import RejectionMessageModal from "./rejectionMessageModal";


const ApprovalModal = ({ orgChart }) => {
    const [approvalObject, setApprovalObject] = useState({});
    const [show, setShow] = useState(true);
    const { approvalToken } = useParams();
    const navigate = useNavigate();
    const [ showRejectionModal, setShowRejectionModal ] = useState(false);

    const approve = async () => {
        const result = await confirm("Are you sure you want to approve?");
        result && makeRequest(fetchApprovalObject(approvalToken), PATCH, { is_approved: true }, true, true);
    }

    const reject = () => setShowRejectionModal(true);

    const handleClose = () => {
        navigate(`/${approvalObject?.role}/scorecard/`);
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
                keyboard={false}
                fullscreen
                // aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="approval_modal"
                contentClassName="approval_model_content"
                backdropClassName="modal_backdrop"
                onHide={ handleClose }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Object Approval</Modal.Title>
                </Modal.Header>
                <Modal.Body className="approval_modal_body">
                    <Outlet context={ { 
                        objective: approvalObject?.change_approval_tracker?.objective,
                        approve,
                        reject,
                        } } 
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { orgChart } }) => ({
    orgChart: orgChart[0]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ApprovalModal);
