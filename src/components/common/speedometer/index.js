import React from "react";
import { Chart } from "chart.js";
import { useEffect } from "react";

import "./styles.scss";
import { connect } from "react-redux";

const Speedometer =  ({ data, value, upper_threshold, lower_threshold }) => {

    if (data === undefined) {
        data = [lower_threshold, upper_threshold, 100];
    }

    const config = {
        type: "gauge",
        data: {
          labels: ["Normal", "Warning", "Critical"],
          datasets: [
            {
              label: "Current Appeal Risk",
              data: data,
              value: value,
              minValue: 0,
              backgroundColor: ["green", "orange", "red"],
              borderWidth: 7
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              generateLabels: {}
            }
          },
          responsive: true,
          title: {
            display: true,
            text: "Financial Risk"
          },
          layout: {
            padding: {
              bottom: 20
            }
          },
          needle: {
            radiusPercentage: 1,
            widthPercentage: 1,
            lengthPercentage: 60,
            color: "rgba(0, 0, 0, 1)"
          },
          valueLabel: {
            fontSize: 12,
            formatter: function (value, context) {
              return value + " %";
            }
          },
          plugins: {
            datalabels: {
              display: "auto",
              formatter: function (value, context) {
                return context.chart.data.labels[context.dataIndex];
      
              },
              color: function (context) {
                return "#ffff";
              },
          
              font: function (context) {
                let width = context.chart.width;
                let size = Math.round(width / 36);
      
                return {
                  weight: "normal",
                  size: size
                };
              }
            }
          }
        }
      };

  useEffect(() => {
    let ctx = document.getElementById("myChart").getContext("2d");
    const myGauge = new Chart(ctx, config);
    myGauge.update();
  }, []);

  return (
    <div className="speedometer">
      <canvas id="myChart"></canvas>
    </div>
  );
}


const mapStateToProps = ({ adminReducer: { settings: { upper_threshold, lower_threshold } } }) => ({
    upper_threshold,
    lower_threshold
  });
  
export default connect(
    mapStateToProps,
  ) (Speedometer);
