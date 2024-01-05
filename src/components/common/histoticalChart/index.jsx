import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

import "./index.scss";
import {  REPORTS } from "../../../utils/constants";


const HistoricalChart = ({ title, chartData, currentObject, loadedIn }) => {

  if (loadedIn !== REPORTS)
    chartData = [ ...chartData, Math.ceil(currentObject?.percentage_progress)];

  useEffect(() => {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
          );

    }, [])
          
      const options = {
        responsive: true,
        scales: {
          y: {
              beginAtZero: true,
              max: 100
          }
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
      
      const labels = ["Quater1", "Quater2", "Quater3", "Quater4"];
      
      const data = {
        labels,
        datasets: [
          {
            label: "Quaterly History Data",
            data: chartData,
            borderColor: "#9f9f9f",
            backgroundColor: "#F2C94C",
          }
        ],
      };

    return (
            <Card className="staff_card historical_line_chart">
                <Line options={options} data={data} />
            </Card>
         );
}

export default HistoricalChart
