import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CascadedCard from "./cascadedCard";

import "./index.scss";

const CascadedCards = props => {
    
    return (
        <div className="">
            <CascadedCard type="cascaded" title="Cascaded objectives" />
            <CascadedCard type="selfCascaded" title="Self cascaded initiatives" />
        </div>
    );
}


export default CascadedCards;
