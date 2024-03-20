import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap"
import { DeleteBin5 } from "@styled-icons/remix-fill/DeleteBin5";

import thumbnail from "../../../assets/josh_logo.jpg";
import { makeRequest } from "../../../utils/requestUtils";
import getURLs from "../../../services/urls";
import { PATCH } from "../../../utils/constants";
import { BASE_CLOUDINARY_URL } from "../../../services/baseURL";
import DialogBox from "../../common/dialogBox";


const CreatedInitiativeInput = ({ deleteId, deleteInitiative, initiative }) => {

    const [showDialog, setShowDialog] = useState(false);
    const deleteInitBackend = () => {
        makeRequest(getURLs().deleteinitiativeURL(deleteId), PATCH, {}, true, true);
        deleteInitiative(deleteId);
    }

    const onDeleteInit = async e => {
        setShowDialog(true);
    };

    let profile_pic;
    initiative?.role?.profile_pic? profile_pic = BASE_CLOUDINARY_URL + initiative?.role?.profile_pic: profile_pic = thumbnail;

    return (
        <>
            <DialogBox
                    showDialog={showDialog}
                    confirm={deleteInitBackend}
                    cancel={()=> {setShowDialog(false)}}
                    title={'Warning'}
                    message={'Deleting the initiative will delete any objectives cascaded from it.'}
                    prompt={'Are you sure you want to delete this initiative?'}
            />
            <Row className="inputs_row">
                
            <Col lg={4}>
                <Form.Group className="initiative_name">
                    <Form.Control 
                    type="text"
                    defaultValue={ initiative?.name }
                    placeholder=""
                    disabled
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Control 
                        className="initiative_weight" 
                        type="text" 
                        placeholder=""
                        valuedefault=""
                        disabled
                    />
                </Form.Group>
            </Col>
            <Col>
                <div className="cascaded">
                    <span>
                        <img className="thumbnail" src={ profile_pic } alt="J"/>
                    </span>

                    <span className="underling_name">
                        {initiative.role?.user?.first_name} {initiative.role?.user?.second_name}
                    </span>
            
                </div>
            </Col>
            <Col className="delete_btn red">
                <span onClick={ onDeleteInit }><DeleteBin5 /></span>
            </Col>
        </Row>
    </>
    );
}

export default CreatedInitiativeInput
