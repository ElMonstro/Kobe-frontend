import React from "react";
import { Card, Button } from "react-bootstrap";

import UploadButton from "../../common/uploadButton";
import { uploadOrgChartURL } from "../../../services/urls";


import "./index.scss";

const UploadOrgCard = props => {
    return (
        <Card className="admin_card upload_org_card">
            <div className="card_cont">
                <div className="card_title">
                    Upload Excel Sheet to Create  Organization Chart
                </div>
                <div className="sample_csv blue_text">
                    Download Sample Excel Sheet
                </div>
                <div className="upload_btn_div">
                    <UploadButton 
                        uploadURL={uploadOrgChartURL} 
                        contentText="Upload Excel" 
                        className="card_btn" 
                        fileKey="file"
                    />
                      
                </div>
                
            </div>
        </Card>
    )
};


export default UploadOrgCard;
