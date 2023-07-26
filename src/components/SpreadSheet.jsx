import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { LineChart } from "@mui/x-charts";
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpreadSheet = () => {
  const [sheetValues, setSheetValues] = useState();

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vROlxbsrlEs9GlPD4Cl7bLD4ngBrqaaT4MlcEHUlToUvKH4vHzUPfTw-L2LcWF9t4yVkA7QO4zF3MXv/pub?output=csv";
  useEffect(() => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        let sheetData = {
          Stasiun: [],
          KM: [],
          Program: [],
          Realisasi: [],
        };

        results.data.forEach((values) => {
          for (let key in values) {
            if (key == "KM") {
              sheetData[key].push(Number(values[key]));
            } else if (key == "Program" || key == "Realisasi") {
              sheetData[key].push(new Date(values[key]));
              // sheetData[key].push(Number(values[key]));
            } else {
              sheetData[key].push(values[key]);
            }
          }
        });

        setSheetValues(sheetData);
      },
    });
  }, []);

  console.log(sheetValues);

  let data = {};
  let options = {};
  if (sheetValues) {
    data = {
      datasets: [
        {
          label: "Program",
          data: sheetValues["KM"].map((v, i) => ({
            x: sheetValues["Program"][i],
            y: v,
          })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Realisasi",
          data: sheetValues["KM"].map((v, i) => ({
            x: sheetValues["Realisasi"][i],
            y: v,
          })),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    options = {
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              minute: "hh:mm a",
            },
          },
          ticks: {
            maxTicksLimit: 15,
          },
        },
        y: {
          // ticks: {
          //   callback: function(value, index, ticks) {
          //   },
          // }
        },
      },
    };
  }

  return sheetValues ? <Line options={options} data={data} /> : <></>;
};

export default SpreadSheet;
