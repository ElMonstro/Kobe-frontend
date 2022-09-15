import React, { useState } from "react";
import { ChevronRight } from "@styled-icons/evaicons-solid/ChevronRight";
import { ChevronDown } from "@styled-icons/evaicons-solid/ChevronDown";

import "./index.scss";

const OpenCloseIcon = ({ defaultMode, handleclick }) => {
    let className;
    handleclick? className = "open_close_icon": className="open_close_icon no_chevron"


    return (
        <span onClick={ handleclick } className={ className }>
            {
                defaultMode ? <ChevronDown/> : <ChevronRight />
            }
        </span>
    )
}

export default OpenCloseIcon
