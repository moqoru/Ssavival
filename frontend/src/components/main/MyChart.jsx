import React from "react";
import { Doughnut } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { data } from "./Data2";

export default function MyChart(props) {
  const { totalCnt, winCnt, loseCnt, drawCnt } = props;

  const data = {
    bar: {
      labels: ["승리", "무승부", "패배"],
      datasets: [
        {
          label: "나의 전적",
          data: [winCnt, drawCnt, loseCnt],
          backgroundColor: ["#3396F4", "#8898A9", "#EC2C54"],
        },
      ],
    },

    // line: {
    //   labels: ["승리", "무승부", "패배"],
    //   datasets: [
    //     {
    //       label: "most widely spoken languages",
    //       data: [winCnt, drawCnt, loseCnt],
    //       backgroundColor: "rgba(255, 99, 132, 0.6)",
    //     },
    //   ],
    // },
  };

  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        height: "70%",
        // padding: "20px",
        backgroundColor: "white",
        borderRadius: "30px",
      }}
    >
      <Doughnut data={data.bar} options={options} />
    </Box>
  );
}
