import React from "react";
import { ChevronRight } from "@styled-icons/evaicons-solid/ChevronRight";
import { ChevronDown } from "@styled-icons/evaicons-solid/ChevronDown";
import { CaretRight } from "@styled-icons/boxicons-regular/CaretRight";
import { CaretDown } from "@styled-icons/boxicons-regular/CaretDown";

import "./index.scss";

const OpenCloseIcon = ({ defaultMode, handleclick, icon="chevron" }) => {
    const iconMapper = {
        "chevron": {
            IconDown: ChevronDown,
            IconRight: ChevronRight
        },
        "caret": {
            IconDown: CaretDown,
            IconRight: CaretRight
        },
    }

    const { IconDown, IconRight } = iconMapper[icon];
    let className;
    handleclick? className = "open_close_icon": className="open_close_icon no_chevron";
    icon === "caret"? className = className += " no_background": className += "";

    return (
        <span onClick={ handleclick } className={ className }>
            {
                defaultMode ? <IconDown /> : <IconRight />
            }
        </span>
    )
}

export default OpenCloseIcon
