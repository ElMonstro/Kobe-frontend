import React from "react";
import { Card } from "react-bootstrap";
import { Close } from "@styled-icons/material-twotone/Close";

import "./index.scss";


const EditPerspectivesCard = props => {
    return (
        <Card className="admin_card edit_perpectives">
            <div className="card_title">Edit Perspectives</div>

                <div className="perspective_input">
                    <input type="text" value="Financial" disabled/>
                    <span className="save_btn">Edit</span>
                 </div>
                 <div className="perspective_input">
                    <input type="text" value="Customer" disabled/>
                    <span className="save_btn">Edit</span>
                 </div>
                 <div className="perspective_input">
                    <input type="text" value="Internal Processes" name="IA" disabled/>
                    <span className="save_btn">Edit</span>
                 </div>
                 <div className="perspective_input">
                    <input type="text" value="Learning and Growth" disabled/>
                    <span className="save_btn">Edit</span>
                 </div>
                 <div className="perspective_input">
                    <input type="text" value="Behavioral Perspectives" name="bp"/>
                    <span className="save_btn">Edit</span>
                 </div>
        </Card>
        
    );
};


export default EditPerspectivesCard;
