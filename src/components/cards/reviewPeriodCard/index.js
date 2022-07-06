import React from "react";
import { Form, Button, Card } from "react-bootstrap";

import "./index.scss";


const ReviewPeriodCard = props => {
    return (
        <Card className="admin_card admin_select_form">
            <div className="card_title">Select Review Period</div>

            <Form>
                <Form.Group className="mb-3" controlId="">
                    <Form.Select >
                        <option value="3">Three months</option>
                        <option value="6">Six months</option>

                    </Form.Select>
                </Form.Group>
                <Button className="card_btn" variant="primary" type="">
                    Save
                </Button>
            </Form>
        </Card>
        
    );
};


export default ReviewPeriodCard;
