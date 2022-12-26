import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Printer } from "styled-icons/bootstrap";

import "./index.scss";
import ListsReportCont from "./listReportCont";

const ListsReport = () => {

    let componentRef = useRef();

    return (
        <div className="list_report">
            <div className="reports_btns">
                <ReactToPrint
                        trigger={() => <div className="print">
                                            <span className="text"> print </span>
                                            <Printer />
                                        </div>
                            }
                        content={() => componentRef}
                />
            </div>
            <ListsReportCont { ...useParams() }  ref={(el) => (componentRef = el)} />
        </div>
    )

    
}

export default ListsReport;
