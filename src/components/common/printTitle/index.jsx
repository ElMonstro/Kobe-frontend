import React from "react";

import "./index.scss";
import { connect } from "react-redux";

const PrintTitle = ({ year, period, loadedIn, current_period }) => {
    const date = new Date()
    if (!period) {
        period = current_period?.period
        year =  date.getFullYear()
    }

    return <div className="print_content_display print_title">
                <span className="label">Year: </span> <span className="value">{ year }</span> &nbsp;
                <span className="label">Period: </span> <span className="value"> { period } </span>
                <span className="label">Page: </span> <span className="value"> { loadedIn } </span>
                <span className="label">Printed on: </span> 
                <span className="value"> { date.getDate() }/{ date.getMonth() }/{ date.getFullYear() } </span> 
                <span className="label">At: </span>  <span className="value">{ date.getHours()} : { date.getMinutes()} </span>
            </div>
};

const mapStateToProps = ({ adminReducer: { settings: { current_period } } }) => ({
    current_period,
  });
  
export default connect(
    mapStateToProps,
  ) (PrintTitle);
