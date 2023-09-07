import React, { useState } from "react";
import {connect} from "react-redux";
import { Modal } from "react-bootstrap";

import "./index.scss";
import { LOGIN } from "../../../utils/constants";
import LoginForm from "./loginForm";
import ResetRequestForm from "./resetRequestForm";
import PasswordResetForm from "./passwordResetForm";

const AuthModal = ({ show, form })  => {
    if (form === undefined){ form = LOGIN; }
    
    const [currentForm, setCurrentForm] = useState(form);
    const formMapper = {
        "login": LoginForm,
        "reset_request": ResetRequestForm,
        "reset_password": PasswordResetForm
    }
    const titleMapper = {
        "login": "Welcome!",
        "reset_request": "Send Password Reset Link",
        "reset_password": "Reset Password"
    }
    const CurrentForm = formMapper[currentForm];
    const title = titleMapper[currentForm];


    return (
        <div className="auth_modal">
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="auth_modal"
                contentClassName="auth_model_content"
                backdropClassName="modal_backdrop"
            >
                <div className="auth_title">{ title }</div>
                <Modal.Body className="auth_modal_body">
                    <CurrentForm setCurrentForm={ setCurrentForm } />
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({authReducer}) => ({
    ...authReducer,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (AuthModal);
