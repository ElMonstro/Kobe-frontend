import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";

import { fetchPerspectivesURL } from "../../services/urls";
import { GET, VIEW } from "../../utils/constants";
import { makeRequest } from "../../utils/requestUtils";
import "./index.scss";
import PrintableViewScorecard from "./viewScorecard";

const ViewScorecard = ({ settings }) => {

    const [perspectives, setPerspectives] = useState([])
    const { role } = useParams();
    const [spinnerState, setSpinnerState] = useState(true);
    const { setActiveComponent } = useOutletContext();
    let componentRef = useRef();

    useEffect(() => {
        setActiveComponent(VIEW);
        setSpinnerState(true);
        makeRequest(fetchPerspectivesURL(role), GET, null, true, false)
            .then(perspectives => {
                perspectives && setPerspectives(perspectives);
            });
        setSpinnerState(false);
    }, [role])
    
    return (
        <div className="scorecard_view">
            <PrintableViewScorecard 
                perspectives={ perspectives } 
                spinnerState={ spinnerState } 
                setActiveComponent={ setActiveComponent } 
                ref={(el) => (componentRef = el)}
            />
        <ReactToPrint
            trigger={() => <div className="print_btn dashboard_btn">
                                <span className="text"> print </span>
                                <Printer />
                            </div>
                }
            content={() => componentRef}
        />
        </div>
    )
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ adminReducer: { settings }, }) => ({
    settings,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (ViewScorecard);
