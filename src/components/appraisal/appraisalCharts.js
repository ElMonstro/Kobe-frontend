import React from "react";
import { Col } from "react-bootstrap";
import 'chart.js/auto';

import { INITIATIVES, OBJECTIVES, PERSPECTIVES, REPORTS } from "../../utils/constants";
import "./index.scss";

import DashboardCharts from "../dashboardsTab/dashboardCharts";
import { connect } from "react-redux";



class AppraisalCharts extends React.Component {

    render() {

        const { objects, loadedIn, currentObject, historicalData, perspectives, objectives, initiatives, settings } = this.props;

        return (
            <Col className="charts">
                <DashboardCharts 
                    objects={objects} 
                    mode={undefined} 
                    loadedIn={REPORTS} 
                    currentObject={currentObject} 
                    historicalData={historicalData} 
                    personalData 
                    historyChart 
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
