import React from "react";

import { GET} from "../../utils/constants";
import "./index.scss";
import { makeRequest } from "../../utils/requestUtils";
import StatusCount from "./statusCounter";
import FilterTable from "./filterTable";
import getURLs from "../../services/urls";
import PersonalData from "../dashboardsTab/personalData";

class ListsReportCont extends React.Component {
    state = {
        employees: []
    };

    componentDidMount() {
        const { role, year, period } = this.props;
        makeRequest(getURLs().fetchUnderAllUnderlingsUrl(role, year, period), GET, null, true, false)
            .then(employees => {
                employees && this.setState({employees, });
            });
    }
   
    render() {
        return <div className="list_report_cont">
                    <div className="print_content_display">
                        <PersonalData />
                    </div>
                    <StatusCount employees={ this.state.employees } />
                    <FilterTable employees={ this.state.employees }/>
                </div>
    }
    
}

export default ListsReportCont;
