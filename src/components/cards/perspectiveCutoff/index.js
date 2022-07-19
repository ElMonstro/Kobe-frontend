import React from "react";
import { Form, Button, Card } from "react-bootstrap";

import "./index.scss";


const PerspectiveCutoffForm = props => {
    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Perspective Cutoff</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Select>
                        <option value="1">Tier One</option>
                        <option value="2">Tier Two</option>
                        <option value="3">Tier Three</option>
                    </Form.Select> 
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default PerspectiveCutoffForm;
