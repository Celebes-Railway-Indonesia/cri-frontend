import React, { useEffect, useState } from "react";
import Papa from "papaparse";
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
import { Box } from "@mui/material";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SheetChart = () => {
  const [sheetValues, setSheetValues] = useState();

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTYI2AIVj5sLF9sAwcq-qIuzbb2ySSZldbiirtz7NZGMtnTNCKA4W99ygIJBHCI1hZq6D0XI3tZfzx/pub?gid=1101023674&single=true&output=csv";
  useEffect(() => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        console.log("results = ", results);
        let sheetData = {
          Stasiun: [],
          KM: [],
          Program: [],
          Realisasi: [],
        };

        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth() + 1;
        const date = dateNow.getDate();

        results.data.forEach((values) => {
          for (let key in values) {
            if (key == "KM") {
              sheetData[key].push(Number(values[key]));
            } else if (key == "Program" || key == "Realisasi") {
              let newTime;
              if (
                isNaN(
                  new Date(
                    year + "-0" + month + "-" + date + "T0" + values[key]
                  )
                )
              ) {
                newTime = year + "-0" + month + "-" + date + "T" + values[key];
              } else {
                newTime = year + "-0" + month + "-" + date + "T0" + values[key];
              }
              sheetData[key].push(new Date(newTime).getTime());
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

  console.log("sheetValues = ", sheetValues);

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
      plugins: {
        title: {
          display: true,
          text: "Grafik GAPEKA",
          font: {
            size: 25,
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              minute: "hh:mm a",
            },
          },
          // ticks: {
          //   maxTicksLimit: 15,
          // },
          title: {
            display: true,
            text: "Waktu Perjalanan KA",
          },
        },
        y: {
          // ticks: {
          //   callback: function(value, index, ticks) {
          //   },
          // }
          title: {
            display: true,
            text: "KM",
          },
        },
      },
    };
  }

  return (
    <Box>
      <Box>{sheetValues ? <Line options={options} data={data} /> : <></>}</Box>
    </Box>
  );
};

export default SheetChart;
