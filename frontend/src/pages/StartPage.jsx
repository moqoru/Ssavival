import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import game from "../assets/game.png";
import titleBox from "../assets/title.png";
import { GameAction } from "../redux/actions/GameAction";

const Pages = styled.div`
  background-image: url(${game});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;
const HeaderComp = styled.div`
  font-family: "neodgm", sans-serif;
`;

// const myProps = {
//   title: "~ SSAVIVAL에 오신것을 환영합니다 ~",
//   number: 0,
// };

export default function StartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const round = useSelector((state) => state.gameReducer.round);

  const startGame = () => {
    const data = {
      userId: localStorage.getItem("userId"),
      round: round + 1,
    };
    dispatch(GameAction.getGameRecord(data));

    navigate("/game");
  };
  return (
    <Pages>
      <HeaderComp>
        <AppBar
          elevation={0}
          position="relative"
          style={{
            backgroundColor: "transparent",
            height: "100px",
            boxShadow: "none",
          }}
        >
          <Container maxWidth="false">
            <Toolbar
              disableGutters
              sx={{
                height: "100px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  position: "relative",
                  flex: 1,
                }}
              >
                <img
                  src={titleBox}
                  alt="background"
                  style={{ width: "70%", height: "100px" }}
                />
                <div
                  style={{
                    color: "white",
                    textShadow:
                      "2px 0 0 black, 0 -2px 0 black, -2px 0 0 black, 0 2px 0 black",
                    position: "absolute", // 자식 요소를 absolute로 설정
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // 가운데 정렬
                    whiteSpace: "nowrap",
                  }}
                >
                  0 of 12 ROUND
                </div>
                <div
                  style={{
                    color: "yellow",
                    textShadow:
                      "2px 0 0 black, 0 -2px 0 black, -2px 0 0 black, 0 2px 0 black",
                    position: "absolute", // 자식 요소를 absolute로 설정
                    bottom: "25%",
                    left: "50%",
                    transform: "translateX(-50%)", // 가운데 정렬
                    whiteSpace: "nowrap",
                  }}
                >
                  ~ SSAVIVAL에 오신것을 환영합니다~
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HeaderComp>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "70%",
            border: 1,
            position: "relative",
            backgroundColor: "white",
            border: "1px solid gray",
            display: "flex" /* 내부 요소들을 세로로 배열 */,
            flexDirection: "column" /* 세로 방향으로 정렬 */,
            justifyContent: "space-between" /* 아래쪽으로 정렬 */,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
              width: "100%",
              height: "80px",
              border: 1,
              position: "relative",
              color: "white",
              fontFamily: "neodgm",
              fontSize: "1.3rem",
              backgroundColor: "#3C90E2",
              border: "none",
            }}
          >
            <div style={{ marginLeft: 20 }}>SSAFY 싸바이벌 대제전</div>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              margin: "0 auto",
              width: "100%",
              height: "80px",
              border: 1,
              position: "relative",
              color: "black",
              fontFamily: "neodgm",
              fontSize: "1.3rem",
              border: "none",
            }}
          >
            <div>
              <span>제한 시간은 정확히&nbsp;</span>
              <span style={{ color: "red", fontWeight: "bold" }}>
                120초&nbsp;
              </span>
              <span>입니다.</span>
            </div>
            <br />
            <div>SSAFY의 하루를 함께 달려봐요!</div>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "50px auto",
              width: "15%",
              height: "50px",
              border: 1,
              position: "relative",
              color: "white",
              fontFamily: "neodgm",
              fontSize: "1.3rem",
              border: "none",
              //   marginBottom: 10,
            }}
          >
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                fontSize: "1.2rem",
                backgroundColor: "#3C90E2",
                color: "white",
                fontFamily: "neodgm",
              }}
              onClick={startGame}
            >
              게임 시작
            </Button>
          </Box>
        </Box>
      </div>
    </Pages>
  );
}
