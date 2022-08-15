import React from "react";

import SearchBox from "../common/searchBox";
import Tree from "../common/Tree/Tree";
import './index.scss';
import { connect } from "react-redux";


const StaffSidebar = ({ orgChart }) => {

    const handleClick = (node) => {
    };

    return (
        <div className="staff_sidebar">
            <div className="sidebar_cont">
                <div className="title">
                    Organization Chart
                </div>
                <SearchBox />
                <Tree data={orgChart} onNodeClick={handleClick}/>
            </div>

        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { orgChart } }) => ({
    orgChart,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StaffSidebar);

