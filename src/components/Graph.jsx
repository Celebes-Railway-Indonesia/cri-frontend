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
import axios from "axios";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [sheetValues, setSheetValues] = useState();

  useEffect(() => {
    axios
      .get("https://sheet.best/api/sheets/abcebd87-24d4-4089-ad20-885b136954a5")
      .then(function (response) {
        let sheetData = {
          Stasiun: [],
          KM: [],
          Program: [],
          Realisasi: [],
        };
        console.log(response);

        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const month = dateNow.getMonth() + 1;
        const date = dateNow.getDate();

        for (let i = 48; i < response.data.length; i++) {
          const data = response.data;

          const program = data[i][3]
          const realisasi = data[i][4];
          const newProgram = year + "-0" + month + "-" + date + "T0" + program;
          const newRealisasi = year + "-0" + month + "-" + date + "T0" + realisasi;
          console.log(newProgram)
          sheetData["Stasiun"].push(data[i][1]);
          sheetData["KM"].push(Number(data[i][2]));
          sheetData["Program"].push(new Date(newProgram).getTime());
          sheetData["Realisasi"].push(new Date(newRealisasi).getTime());
        }
        console.log("sheetData = ", sheetData);
        // results.data.forEach((values) => {
        //   for (let key in values) {
        //     if (key == "KM") {
        //       sheetData[key].push(Number(values[key]));
        //     } else if (key == "Program" || key == "Realisasi") {
        //       sheetData[key].push(new Date(values[key]).getTime());
        //       // sheetData[key].push(Number(values[key]));
        //     } else {
        //       sheetData[key].push(values[key]);
        //     }
        //   }
        // });
        setSheetValues(sheetData);
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
          ticks: {
            maxTicksLimit: 15,
          },
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

export default Graph;
