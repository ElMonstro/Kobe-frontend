import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';

import "./index.scss";
import ListsReportCont from "./listReportCont";

const ListsReport = () => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    });

    return (
        <div className="list_report">
            <button onClick={handlePrint}>Print this out!</button>
            <ListsReportCont  innerRef={ componentRef } />
        </div>
    )

    
}

export default ListsReport;
