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
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { colors } from "../styles/theme";
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

const SheetChart = () => {
  const [sheets, setSheets] = useState();
  const [selectedSheet, setSelectedSheet] = useState("");
  const [selectedValues, setSelectedValues] = useState();
  const [sheetValues, setSheetValues] = useState();

  const handleChange = (e) => {
    setSelectedSheet(e.target.value);
    setSelectedValues(sheetValues[e.target.value]);
  };

  useEffect(() => {
    axios
      .get(
        "https://script.google.com/macros/s/AKfycbyits0CTrT6hLhivXlE7hjNbYS_0f4JRibKP45cCkiN5ftJoui1X4sYQIyHVy9nKtCq/exec"
      )
      .then(function (response) {
        let data = response.data;
        console.log("data = ", data);
        let arr = [];
        for (let key in data) {
          arr.push(key);
        }
        setSheets(arr);
        setSelectedSheet(Object.keys(data)[0]);
        setSelectedValues(data[Object.keys(data)[0]]);
        setSheetValues(data);
      });
  }, []);

  let data = {};
  let options = {};
  if (selectedValues) {
    data = {
      datasets: [
        {
          label: "Program",
          data: selectedValues["KM"].map((v, i) => ({
            x: selectedValues["Program"][i],
            y: v,
          })),
          borderColor: colors.grey[200],
          backgroundColor: colors.grey[300],
        },
        {
          label: "Realisasi",
          data: selectedValues["KM"].map((v, i) => ({
            x: selectedValues["Realisasi"][i],
            y: v,
          })),
          borderColor: colors.blue[500],
          backgroundColor: colors.blue[600],
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
    <Box sx={{ p: 2 }}>
      <Box>
        <FormControl>
          <InputLabel>Tanggal</InputLabel>
          <Select value={selectedSheet} label="Tanggal" onChange={handleChange}>
            {sheets?.map((sheet, i) => (
              <MenuItem key={i} value={sheet}>
                {sheet}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{height: '80vh'}}>
        {selectedValues ? <Line options={options} data={data} /> : <></>}
      </Box>
    </Box>
  );
};

export default SheetChart;
