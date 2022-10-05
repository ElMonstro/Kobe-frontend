import React from "react";

import SearchBox from "../common/searchBox";
import Tree from "../common/Tree/Tree";
import './index.scss';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";


const StaffSidebar = ({ orgChart }) => {

    const navigate = useNavigate();

    const handleClick = (node) => {
        navigate(`/${node.node.id}/scorecard`);
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

