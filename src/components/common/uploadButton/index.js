import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { generateString } from "../../../utils";
import { POST } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";

import "./index.scss";


const UploadButton = ({ 
    disabled, contentText, 
    className, uploadURL, 
    fileKey, extraData, 
    setSpinnerStatus, method, 
    ClickElement, handleRequestResult }) => {

    const [inputFile, setInputFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileNameClass, setFileNameClass] = useState('blue_text');
    const randomString = generateString(5);
    const inputElementID = `${fileKey}-${randomString}`;

    if (!method) {
        method = POST;
    }
    
    useEffect(() => {
        setInputFile(document.getElementById(inputElementID));
    }, []);

    const handleUpload = () => {
        inputFile?.click();
    };

    const uploadFile = async () => {
        setFileName(inputFile?.files[0]?.name);
        const formData = new FormData();
        for ( const key in extraData ) {
            formData.append(key, extraData[key]);
        }
        formData.append(fileKey, inputFile?.files[0]);
        setSpinnerStatus && setSpinnerStatus(true);
        const data = await makeRequest(uploadURL, method, formData, true, true, true);
        data && handleRequestResult && handleRequestResult(data);
        setSpinnerStatus && setSpinnerStatus(false);
        data? setFileNameClass('green_text'): setFileNameClass('red_text');
    }

    return (
        <div className="upload_btn">
            <input id={inputElementID} onChange={uploadFile} className="d-none" type="file" />
            {   
                
                <Button disabled={disabled} onClick={handleUpload} className={className}>
                    {
                        ClickElement? <ClickElement />: contentText
                    }
                </Button>}
            {fileName && <span id="file_name_text" className={ fileNameClass }>
               {fileName} 
            </span>}
        </div>
    );
}

export default UploadButton
