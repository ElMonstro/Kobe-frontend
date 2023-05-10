import React, { useEffect, useRef, useState } from "react";
import {Search} from "@styled-icons/boxicons-regular/Search";
import {CloseOutline} from "@styled-icons/evaicons-outline/CloseOutline";

import "./index.scss";
import SearchList from "./searchList";
import { connect } from "react-redux";
import { convertFromNestedToFlat } from "../../../utils";

const SearchBox = ({orgChart}) => {
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const people = useRef([]);

    useEffect(() => {
        if(orgChart) {
            people.current = convertFromNestedToFlat(orgChart, "underlings");
        }
    
    }, [orgChart]);

    useEffect(() => {
        if(searchTerm) {
            const newPeople = people.current.filter(role => {
                console.log(role?.user.first_name.toLowerCase())
                return role?.user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
                    || role?.user.second_name.toLowerCase().includes(searchTerm.toLowerCase())
            });
            setFilteredPeople(newPeople);
        }
    }
    , [searchTerm]);


    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search_box_cont">
            <div className="search_cont">
                <Search />
                <input onChange={handleOnChange} value={searchTerm} className="search_box" placeholder="Enter Employee"></input>
                <span className="close_icon" onClick={() => setSearchTerm("")}><CloseOutline  /></span>
            </div>
            {
                searchTerm && <SearchList setSearchTerm={setSearchTerm} filteredPeople={filteredPeople} />
            }
        </div>
    );
}

const mapStateToProps = ({adminReducer: {orgChart}}) => ({
    orgChart: orgChart[0]
})

export default connect(mapStateToProps, null)(SearchBox);
