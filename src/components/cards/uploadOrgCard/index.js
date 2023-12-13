import React from "react";
import { Card } from "react-bootstrap";

import UploadButton from "../../common/uploadButton";
import getURLs from "../../../services/urls";
import exampleOrgFile from "../../../assets/example_org_file.xlsx"


import "./index.scss";
import { useParams } from "react-router-dom";

const UploadOrgCard = ({ setOrgChartSpinner, settings, setOrgChart }) => {
    const { companyId } = useParams();
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
                        uploadURL={ getURLs().adminOrgChartURL(companyId) } 
                        contentText="Upload Excel" 
                        className="card_btn" 
                        fileKey="file"
                        handleRequestResult={ setOrgChart }
                    />
                      
                </div>
                
            </div>
        </Card>
    )
};


export default UploadOrgCard;
