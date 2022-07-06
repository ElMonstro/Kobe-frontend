import React from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";

import "./index.scss";


const CascadeCutoffForm = props => {
    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Cascade Cutoff</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Select type="text" placeholder="Tier" />
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default CascadeCutoffForm;
