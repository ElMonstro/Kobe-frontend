import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchApproversURL } from "../../../services/urls";
import { GET } from "../../../utils/constants";
import { makeRequest } from "../../../utils/requestUtils";

import "./index.scss";

const SignOff = ({role}) => {
  
    const [approvers, setApprovers] = useState([]);

    useEffect(() => {
        makeRequest(fetchApproversURL, GET, null, true, false).then(data =>
            data && setApprovers(data));
    }, []);

    return (
        <div className="signoff print_content_display">
            <div className="owner">
                <span className="label">Owner:</span>
                <span className="name"> {role?.user.first_name} {role?.user.second_name} <span>({ role?.name })</span></span>
                <span className="label">Signature: </span>
                <span className="signature">_______________________</span>
            </div>

            {
                approvers.map(approver => {
                    return (
                    <div key={approver.name} className="approver">
                        <span className="label">Approver:</span>
                        <span className="name">{ approver.name } <span>({ approver.position })</span></span>
                        <span className="label">Signature: </span>
                        <span className="signature">_______________________</span>
                    </div>
                )
                })
            }
        </div>
    )
}

const mapStateToProps = ({ adminReducer: { orgChart }}) => ({
    role: orgChart[0]
  });
  
export default connect(
    mapStateToProps,
  ) (SignOff);
