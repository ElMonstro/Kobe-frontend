import React from "react";
import { Card, Button } from "react-bootstrap";

import "./index.scss";

const UploadOrgCard = props => {
    return (
        <Card className="admin_card">
            <div className="card_cont">
                <div className="card_title">
                    Upload Excel Sheet to Create  Organization Chart
                </div>
                <div className="sample_csv blue_text">
                    Download Sample Excel Sheet
                </div>
                <div className="upload_btn_div">
                    <Button className="card_btn">
                        Upload Logo
                    </Button>
                    <span className="file_name blue_text">
                        Eurochem_org.xls
                    </span>
                </div>
                
            </div>
        </Card>
    )
};


export default UploadOrgCard;
