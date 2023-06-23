import React from "react";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function CampusChart() {
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

  // redux 캠퍼스 별 평균 점수 가져오기
  const seoul = useSelector((state) => state.mainReducer.seoul);
  const daejeon = useSelector((state) => state.mainReducer.daejeon);
  const gumi = useSelector((state) => state.mainReducer.gumi);
  const gwangju = useSelector((state) => state.mainReducer.gwangju);
  const busan = useSelector((state) => state.mainReducer.busan);

  const data = {
    bar: {
      labels: ["서울", "대전", "구미", "광주", "부울경"],
      datasets: [
        {
          label: "캠퍼스 순위",
          data: [seoul, daejeon, gumi, gwangju, busan],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
  };

  //   line: {
  //     labels: ["서울", "대전", "구미", "광주", "부울경"],
  //     datasets: [
  //       {
  //         label: "most widely spoken languages",
  //         data: [1132, 1117, 615, 534, 280],
  //         backgroundColor: "rgba(255, 99, 132, 0.6)",
  //       },
  //     ],
  //   },

  return (
    <Box
      sx={{
        height: "100%",
        fontFamily: "gmarket",
      }}
    >
      <Bar
        data={data.bar}
        options={options}
        style={{ fontFamily: "gmarket" }}
      />
    </Box>
  );
}
