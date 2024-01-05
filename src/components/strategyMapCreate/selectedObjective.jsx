import React from "react";
import { Row } from "react-bootstrap";


const SelectedObjective = ({ option, perspective })=> {

    return (
        <Row className="selected_objective">
            <span className="name truncate">
                { option.label }
            </span>
            <span className="perspective_name truncate">{ perspective }</span>
            
        </Row>
        
    );
};

export default SelectedObjective;
