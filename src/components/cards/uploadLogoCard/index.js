import React from "react";
import { Card } from "react-bootstrap";
import getURLs from "../../../services/urls";
import UploadButton from "../../common/uploadButton";

import "./index.scss";
import { PATCH } from "../../../utils/constants";

const UploadLogoCard = () => {
    return (
        <Card className="admin_card">
            <div className="card_cont">
                <div className="card_title">
                    Upload Organization Logo
                </div>
                <UploadButton 
                    uploadURL={ getURLs().companyInfoURL} 
                    contentText="Upload Logo" 
                    className="card_btn" 
                    fileKey="logo"
                    method={ PATCH }
                />
            </div>
        </Card>
    )
};


export default UploadLogoCard;
