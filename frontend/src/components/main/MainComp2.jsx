import React, { useEffect } from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MyChart from "./MyChart";
import smilepin from "../../assets/smilepin.png";
import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import platinum from "../../assets/platinum.png";
import dia from "../../assets/dia.png";
import master from "../../assets/master.png";
import challenger from "../../assets/challenger.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MainAction } from "../../redux/actions/MainAction";

const Comp2 = styled.div`
  font-family: "neodgm";
`;
const Line = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 1rem;
`;
const Line2 = styled.div`
  padding-top: 30px;
  // padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 1rem;
`;
const Chips = styled.div`
  padding: 5px 2px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Title = styled.div`
  // margin-left: 10px;
`;
const Content = styled.div`
  // margin-right: 30px;
  color: yellow;
`;

// 색상을 변경할 테마 생성
const theme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "yellow",
        },
      },
    },
  },
});

// function valuetext(value) {
//   return `${value}°C`;
// }
export default function MainComp2() {
  const dispatch = useDispatch();

  // AXIOS 요청보내기
  useEffect(() => {
    dispatch(MainAction.getStatistics(localStorage.getItem("userId")));
  }, []);

  // redux
  // const mileage = 5732;
  const mileage = useSelector((state) => state.mainReducer.mileage);
  const tier = useSelector((state) => state.mainReducer.tier);
  const totalCnt = useSelector((state) => state.mainReducer.totalCnt);
  const winCnt = useSelector((state) => state.mainReducer.winCnt);
  const loseCnt = useSelector((state) => state.mainReducer.loseCnt);
  const drawCnt = useSelector((state) => state.mainReducer.drawCnt);

  return (
    <Comp2>
      {" "}
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          backgroundColor: "#3396F4",
          borderRadius: 12,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: 2,

            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <div>
            <Line>
              <Title>내 티어</Title>
              <Content>{tier}</Content>
            </Line>
            <Line>
              <Title>마일리지</Title>
              <Content>{mileage} M</Content>
            </Line>
          </div>
          <div>
            {/* <img
              src={smilepin} // 표시할 이미지 경로
              alt=""
              style={{
                // position: "absolute",
                top: "-30px", // 이미지 위치 조정
                marginLeft: `${mileage / 100}px`,
                width: "30px", // 이미지 크기 조정
                height: "auto",
              }}
            /> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={
                  mileage >= 3000 && mileage < 4000
                    ? bronze
                    : mileage >= 4000 && mileage < 5000
                    ? silver
                    : mileage >= 5000 && mileage < 6000
                    ? gold
                    : mileage >= 6000 && mileage < 7000
                    ? platinum
                    : mileage >= 7000 && mileage < 8000
                    ? dia
                    : mileage >= 8000 && mileage < 9000
                    ? master
                    : mileage >= 9000
                    ? challenger
                    : null
                }
                alt=""
                style={{
                  width: 20,
                  margin: 2,
                }}
              />
              <ThemeProvider theme={theme}>
                <Slider
                  aria-label="Temperature"
                  aria-labelledby="discrete-slider-small-steps"
                  step={1}
                  value={mileage}
                  min={mileage - (mileage % 1000)}
                  max={mileage - (mileage % 1000) + 1000}
                  getAriaValueText={(value) => `${value}`}
                  valueLabelDisplay="on"
                  sx={{ width: "65%" }}
                />
              </ThemeProvider>
              <img
                src={
                  mileage >= 3000 && mileage < 4000
                    ? silver
                    : mileage >= 4000 && mileage < 5000
                    ? gold
                    : mileage >= 5000 && mileage < 6000
                    ? platinum
                    : mileage >= 6000 && mileage < 7000
                    ? dia
                    : mileage >= 7000 && mileage < 8000
                    ? master
                    : mileage >= 8000 && mileage < 9000
                    ? challenger
                    : mileage >= 9000
                    ? challenger
                    : null
                }
                alt=""
                style={{
                  width: 20,
                  margin: 2,
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            borderRight: "1px solid white",
            marginTop: 20,
            marginBottom: 20,
          }}
        ></div>
        <div style={{ flex: 3, margin: 10 }}>
          <Line2>
            <Title>나의 전적</Title>
          </Line2>
          <Line2>
            <div style={{ width: "50%", height: "auto" }}>
              <MyChart
                totalCnt={totalCnt}
                winCnt={winCnt}
                loseCnt={loseCnt}
                drawCnt={drawCnt}
              />
            </div>
            <div>
              <Chips>
                <Chip
                  label="대전횟수"
                  color="success"
                  variant="outlined"
                  sx={{
                    width: 80,
                    height: 25,
                    bgcolor: "white",
                    color: "#CEBC4D",
                    border: "1px solid #CEBC4D",
                  }}
                />
                <span>{totalCnt}</span>
              </Chips>
              <Chips>
                <Chip
                  label="승리"
                  sx={{
                    width: 80,
                    height: 25,
                    bgcolor: "white",
                    color: "#3396F4",
                    border: "1px solid #3396F4",
                    // borderColor: "",
                  }}
                />
                <span>{winCnt}</span>
              </Chips>
              <Chips>
                <Chip
                  label="무승부"
                  sx={{
                    width: 80,
                    height: 25,
                    bgcolor: "white",
                    color: "#6B6E71",
                    border: "1px solid #6B6E71",
                  }}
                />
                <span>{drawCnt}</span>
              </Chips>
              <Chips>
                <Chip
                  label="패배"
                  sx={{
                    width: 80,
                    height: 25,
                    bgcolor: "white",
                    color: "#EC2C54",
                    border: "1px solid #EC2C54",
                  }}
                />
                <span>{loseCnt}</span>
              </Chips>
            </div>
          </Line2>
        </div>
      </Box>
    </Comp2>
  );
}
