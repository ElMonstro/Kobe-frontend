import React from "react";
import {Search} from "@styled-icons/boxicons-regular/Search";

import "./index.scss";

const SearchBox = props => {

    return (
        <div className="search_cont">
            <Search />
            <input className="search_box" placeholder="Enter Employee"></input>
        </div>
    );
}

export default SearchBox;
