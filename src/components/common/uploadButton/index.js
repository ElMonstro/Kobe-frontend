import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { generateString } from "../../../utils";
import { POST, PUT } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";

import "./index.scss";


const UploadButton = props => {

    const {contentText, className, uploadURL, fileKey, extraData} = props;
    const [inputFile, setInputFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const randomString = generateString(5);
    const inputElementID = `${fileKey}-${randomString}`;

    useEffect(() => {
        setInputFile(document.getElementById(inputElementID));
    }, []);

    const handleUpload = () => {
        inputFile?.click();
    };

    const uploadFile = () => {
        setFileName(inputFile?.files[0]?.name);
        const formData = new FormData();
        for ( var key in extraData ) {
            formData.append(key, extraData[key]);
        }
        console.log(uploadURL);
        formData.append(fileKey, inputFile?.files[0]);
        makeRequest(uploadURL, POST, formData, true);
    }

    return (
        <div className="upload_btn">
            <input id={inputElementID} onChange={uploadFile} className="d-none" type="file" />
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
