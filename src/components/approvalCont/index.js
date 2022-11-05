import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import "./index.scss";
import ApprovalNav from "./approvalNav";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requestUtils";
import { GET, OBJECTIVE } from "../../utils/constants";
import { fetchApprovalObject } from "../../services/urls";
import { connect } from "react-redux";


const ApprovalModal = ({ orgChart }) => {
    console.log(orgChart)
    const [activeComponent, setActiveComponent] = useState(OBJECTIVE);
    const [approvalObject, setApprovalObject] = useState({});
    const [show, setShow] = useState(true);
    const { approvalToken } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(`/${orgChart?.id}/scorecard/`);
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
                    <ApprovalNav activeComponent={ activeComponent } />
                    <Outlet context={ { 
                        setActiveComponent: setActiveComponent,
                        objective: approvalObject?.change_approval_tracker?.objective 
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
