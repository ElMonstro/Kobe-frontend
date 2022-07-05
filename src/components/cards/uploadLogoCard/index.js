import React from "react";
import { Card, Button } from "react-bootstrap";

import "./index.scss";

const UploadLogoCard = props => {
    return (
        <Card className="admin_card">
            <div className="card_cont">
                <div className="card_title">
                    Upload Organization Logo
                </div>
                <Button className="card_btn">
                    Upload Logo
                </Button>
            </div>
        </Card>
    )
};


export default UploadLogoCard;
