import React from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import "./index.scss";
import CompanyForm from "./companyForm";
import { makeRequest } from "../../utils/requestUtils";
import getURLs from "../../services/urls";
import { PATCH } from "../../utils/constants";
import { yupEditCompanyValidation } from "../../utils/validators";
import { setShowEditCompany } from "../../redux/actions";

const EditCompanyModal = ({ showEditCompany, companyInfo, setShowEditCompany })  => {

    const initialValues = {
        name: companyInfo?.name,
        rest_server: companyInfo?.rest_server,
        grpc_server: companyInfo?.grpc_server,
        email_domain: companyInfo?.email_domain,
    };

    const editCompany = (values) => {
        makeRequest(getURLs().adminCompanyInfoURL(companyInfo?.id), PATCH, values, true, true);
    };

    return (
        <div className="edit_company_modal">
            <Modal
                show={showEditCompany}
                onHide={() => setShowEditCompany(false)}
                size="m"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="company_modal"
                contentClassName="company_modal_content"
                backdropClassName="modal_backdrop"
            >
                <Modal.Header closeButton>
                    <div className="title">Edit Company</div>
                </Modal.Header>
                
                <Modal.Body className="company_modal_body">
                    <CompanyForm 
                        initialValues={ initialValues }
                        enableReinitialize
                        onSubmit={ editCompany }
                        validationSchema={ yupEditCompanyValidation }

                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
    setShowEditCompany
}

const mapStateToProps = ({adminReducer: { showEditCompany, companyInfo }}) => ({
    showEditCompany,
    companyInfo
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (EditCompanyModal);
