import React from "react";

import { INITIATIVES, OBJECTIVES, OVER_VIEW, PERSPECTIVES} from "../../utils/constants";
import "./index.scss";
import { Col, Row } from "react-bootstrap";
import Speedometer from "../common/speedometer";
import Overview from "./overview";
import HistoricalChart from "../common/histoticalChart";
import ReportChildObjects from "./childObjects";
import PersonalData from "./personalData";

class DashboardCharts extends React.Component {

    render() {

        const { loadedIn, currentObject, objects, historicalData, mode, personalData, historyChart } = this.props;
        const modeToObjectsMapper = {
            perspectives: OBJECTIVES,
            objectives: INITIATIVES,
            undefined: PERSPECTIVES
          }
        const childrenTitle = modeToObjectsMapper[mode];
        const actualPercentage = currentObject?.percentage_score/100;
        const plannedPercentage = currentObject?.percentage_target/100;
        let title;

        mode? title = currentObject.name: title = "Overall Perfomance";

        return <div>
                { personalData &&
                    <PersonalData />
                }
                <div className="charts_title">
                    {mode && mode.substring(0, mode.length-1) + " -"} { title }
                </div>
                    {
                        <Row className="speedometers">
                            <Col className="actual">
                                <Speedometer title="Actual" percent={ actualPercentage } description="actual perfomance" />
                            </Col>
                            <Col className="planned">
                                <Speedometer title="Planned" percent={ plannedPercentage } description="planned perfomance" />
                            </Col>
                        </Row>
                    }
                    {
                        loadedIn !== OVER_VIEW && mode !== INITIATIVES &&
                        <Row className="overview">
                            <Overview objects={ objects } title={ childrenTitle }/>
                        </Row>
                    }
                    { 
                        historyChart &&
                        <Row className="historical_chart">
                            <HistoricalChart chartData={ historicalData } title="Historical Chart" />
                        </Row>
                    }
                    {
                        objects?.length > 0 && loadedIn !== OVER_VIEW && mode !== INITIATIVES &&
                        <Row>
                            <ReportChildObjects objects={ objects } title={ childrenTitle } />
                        </Row>
                    }
                </div>
    }
    
}

export default DashboardCharts;
