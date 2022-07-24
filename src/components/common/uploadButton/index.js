import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { POST, PUT } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";

import "./index.scss";


const UploadButton = props => {

    const {contentText, className, uploadURL} = props;
    const [inputFile, setInputFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        setInputFile(document.getElementById("input-file"));
    }, []);

    const handleUpload = () => {
        inputFile?.click();
    };

    const uploadFile = () => {
        setFileName(inputFile?.files[0]?.name);
        const formData = new FormData();
        formData.append('logo', inputFile?.files[0]);
        const data = makeRequest(uploadURL, POST, formData, true);
        console.log(data);
        
    }

    return (
        <div className="upload_btn">
            <input id="input-file" onChange={uploadFile} className="d-none" type="file" />
            <Button onClick={handleUpload} className={className}>
                {contentText}
            </Button>
            {fileName && <span className="blue_text">
               {fileName} 
            </span>}
        </div>
    );
}

export default UploadButton
