import React from "react";
import { Card, Button } from "react-bootstrap";

import UploadButton from "../../common/uploadButton";
import { uploadOrgChartURL } from "../../../services/urls";
import exampleOrgFile from "../../../assets/example_org_file.xlsx"


import "./index.scss";

const UploadOrgCard = ({ setOrgChartSpinner, settings }) => {
    return (
        <Card className="admin_card upload_org_card">
            <div className="card_cont">
                <div className="card_title">
                    Upload Excel Sheet to Create  Organization Chart
                </div>
                <div className="sample_csv blue_text">
                    <a href={ exampleOrgFile } download>
                        Download Sample Excel Sheet
                    </a>
                </div>
                <div className="upload_btn_div">
                    <UploadButton 
                        disabled={ settings?.are_emails_sent }
                        setSpinnerStatus={ setOrgChartSpinner }
                        uploadURL={ uploadOrgChartURL } 
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
