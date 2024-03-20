import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE, EDIT, INITIATIVE, SCORECARD, UPDATE } from "../../../utils/constants";

import "./index.scss";

const CascadedInitiative = ({ name, id, type})=> {

    let buttonType = EDIT

    if (type === INITIATIVE){
        buttonType = CREATE;
    }
    const navigate = useNavigate();
    const { role } = useParams();

    const handleClick = e => {
        const url = `/${role}/${SCORECARD}/${UPDATE}/${e.target.id}/${buttonType}`;
        navigate(url);
    };

    return (
        <div className="initiative">
            <div className="initiative_name">
                { name }
            </div>
            <Button onClick={ handleClick } id={ id } className={ `action_btn ${buttonType}` }>
                { buttonType }
            </Button>
        </div>
    )
}

export default CascadedInitiative;
