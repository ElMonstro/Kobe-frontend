import React from "react";

import { GET} from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import StatusCount from "./statusCounter";
import FilterTable from "./filterTable";
import { fetchUnderAllUnderlingsUrl } from "../../services/urls";

class ListsReportCont extends React.Component {
    state = {
        employees: []
    };

    componentDidMount() {
        makeRequest(fetchUnderAllUnderlingsUrl, GET, null, true, false)
            .then(employees => {
                employees && this.setState({employees, });
                console.log(employees)
            });
    }
   
    render() {
        return <div className="list_report_cont">
                    <StatusCount employees={ this.state.employees } />
                    <FilterTable employees={ this.state.employees }/>
                </div>
    }
    
}

export default ListsReportCont;
