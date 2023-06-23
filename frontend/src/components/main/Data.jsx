import { useSelector } from "react-redux";

export const data = {
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
