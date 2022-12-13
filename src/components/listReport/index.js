import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext, useParams } from "react-router-dom";

import { GET} from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import StatusCount from "./statusCounter";
import FilterTable from "./filterTable";
import { fetchUnderAllUnderlingsUrl } from "../../services/urls";

const ListsReport = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        makeRequest(fetchUnderAllUnderlingsUrl, GET, null, true, false)
            .then(employees => {
                employees && setEmployees(employees);
            });
    }, []);
    

    return (
        <div className="list_report">
            <StatusCount employees={ employees } />
            <FilterTable employees={ employees }/>
        </div>
    )

    
}

export default ListsReport;
