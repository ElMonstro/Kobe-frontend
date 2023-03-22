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


const HistoricalChart = ({ title, chartData, currentObject }) => {
  chartData = [ ...chartData, currentObject?.percentage_score]

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
