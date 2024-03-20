import React from "react";
import { Col } from "react-bootstrap";
import 'chart.js/auto';

import { INITIATIVES, OBJECTIVES, PERSPECTIVES, QUARTER_TO_DATE, REPORTS } from "../../utils/constants";
import "./index.scss";

import DashboardCharts from "../dashboardsTab/dashboardCharts";
import PrintTitle from "../common/printTitle";


class AppraisalCharts extends React.Component {

    render() {

        const { objects, loadedIn, currentObject,
             historicalData, perspectives, objectives,
            initiatives, settings, year, period
         } = this.props;

        return (
            
            <Col className="charts">
                <PrintTitle loadedIn={ REPORTS } year={ year } period={ period } />

                <DashboardCharts 
                    objects={objects} 
                    mode={undefined} 
                    loadedIn={REPORTS} 
                    currentObject={currentObject} 
                    historicalData={historicalData}
                    dataContext={QUARTER_TO_DATE}
                    personalData 
                    historyChart 
                    year={year} 
                    period={period} 
                />

                {
                    settings.perspectives_report_enabled && 
                    <div className="perspectives">
                        <div className="charts_title large_title">Perspectives</div>

                        {
                            perspectives.map(perspective => 
                                <DashboardCharts 
                                    objects={perspective.objectives} 
                                    mode={PERSPECTIVES} 
                                    loadedIn={REPORTS} 
                                    currentObject={perspective} 
                                    historicalData={historicalData} 
                                    dataContext={QUARTER_TO_DATE}
                                    key={ perspective.id }
                                />
                            )
                        }
                    </div>
                }

                {
                    settings.objectives_report_enabled && 
                    <div className="objectives">
                        { objectives.length > 0 && <div className="charts_title large_title">Objectives</div> }
                    {
                        objectives.map(objective => 
                            <DashboardCharts 
                                objects={objective.initiatives} 
                                mode={OBJECTIVES} 
                                loadedIn={REPORTS} 
                                currentObject={objective} 
                                historicalData={historicalData} 
                                key={ objective.id }
                                dataContext={QUARTER_TO_DATE}

                            />
                        )
                    }

                </div>}

                {
                    settings.initiatives_report_enabled && 
                    <div className="initiatives">
                        {initiatives.length > 0 && <div className="charts_title large_title">Initiatives</div> }

                        {
                            initiatives.map(initiative => 
                            <DashboardCharts 
                                mode={INITIATIVES} 
                                loadedIn={REPORTS} 
                                currentObject={initiative} 
                                historicalData={historicalData} 
                                key={ initiative.id }
                                dataContext={QUARTER_TO_DATE}
                            />
                            )
                        }
                    </div>
                }
            </Col>
        );
    }
}

export default AppraisalCharts
