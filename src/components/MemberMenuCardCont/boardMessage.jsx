import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SCORECARD, UPDATE } from "../../utils/constants";
import MemberNavCard from "../cards/MemberNavCard";

import "./index.scss";


const BoardMessage = ({ currentRole }) => {
    
    return (
        <div className="card board_message">
            <p>
                Hello Mr. { currentRole.user.second_name}. Welcome to the application. You can start exploring 
                the company by clicking on the organization chart on your left.
            </p>
        </div>
    )
}

export default BoardMessage;
