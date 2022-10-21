import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import SearchBox from "../common/searchBox";
import Tree from "../common/Tree/Tree";
import { setCurrentRole } from "../../redux/actions";
import "./index.scss";



const StaffSidebar = ({ orgChart, setCurrentRole }) => {

    const navigate = useNavigate();

    const handleClick = (node) => {
        navigate(`/${node.node.id}/scorecard`);
        setCurrentRole(node.node);
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
    setCurrentRole
}

const mapStateToProps = ({ adminReducer: { orgChart } }) => ({
    orgChart,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (StaffSidebar);

