import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import "./index.scss";

const LoginModal = props => {

    const { isLoggedOut } = props;

    const [show, setShow] = useState(Boolean(isLoggedOut));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="auth_modal">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="auth_modal"
                contentClassName="auth_model_content"
                backdropClassName="modal_backdrop"
            >
                <div className="auth_title">Hi. Welcome!</div>
                <Modal.Body className="auth_modal_body">
            
                    <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="username@company.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="password_input" type="text" placeholder="Password" />
                    </Form.Group>
                    <Button className="login_btn" variant="primary" type="">
                        Login
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoginModal;
