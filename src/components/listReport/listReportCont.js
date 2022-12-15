import React, { forwardRef, useEffect, useState } from "react";

import { GET} from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import StatusCount from "./statusCounter";
import FilterTable from "./filterTable";
import { fetchUnderAllUnderlingsUrl } from "../../services/urls";

const ListsReportCont = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        makeRequest(fetchUnderAllUnderlingsUrl, GET, null, true, false)
            .then(employees => {
                employees && setEmployees(employees);
            });
    }, []);
    
    forwardRef((props, innerRef) => {
        return (
            <div ref={ innerRef } className="list_report_cont">
                <StatusCount employees={ employees } />
                <FilterTable employees={ employees }/>
            </div>
        );
      });
}

export default ListsReportCont;
