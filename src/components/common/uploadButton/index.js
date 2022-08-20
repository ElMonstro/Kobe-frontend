import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { generateString } from "../../../utils";
import { POST, PUT } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";

import "./index.scss";


const UploadButton = props => {

    const { disabled, contentText, className, uploadURL, fileKey, extraData, setSpinnerStatus } = props;
    const [inputFile, setInputFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileNameClass, setFileNameClass] = useState('blue_text');
    const randomString = generateString(5);
    const inputElementID = `${fileKey}-${randomString}`;
    

    useEffect(() => {
        setInputFile(document.getElementById(inputElementID));
    }, []);

    const handleUpload = () => {
        inputFile?.click();
    };

    const uploadFile = async () => {
        setFileName(inputFile?.files[0]?.name);
        const formData = new FormData();
        for ( var key in extraData ) {
            formData.append(key, extraData[key]);
        }
        formData.append(fileKey, inputFile?.files[0]);
        setSpinnerStatus(true);
        const data = await makeRequest(uploadURL, POST, formData, true);
        setSpinnerStatus(false);
        data? setFileNameClass('green_text'): setFileNameClass('red_text');
    }

    return (
        <div className="upload_btn">
            <input id={inputElementID} onChange={uploadFile} className="d-none" type="file" />
            <Button disabled={disabled} onClick={handleUpload} className={className}>
                {contentText}
            </Button>
            {fileName && <span className={ fileNameClass }>
               {fileName} 
            </span>}
        </div>
    );
}

export default UploadButton
