/* eslint-disable no-console */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import coin from "../../assets/coin.png";
import time from "../../assets/time.png";
import menu from "../../assets/menu.png";
import yes from "../../assets/yes.png";
import onemore from "../../assets/onemore.png";
import titleBox from "../../assets/title.png";
const HeaderComp = styled.div`
  font-family: "neodgm", sans-serif;
`;

function Header() {
  const round = useSelector((state) => state.gameReducer.round);
  const title = useSelector((state) => state.gameReducer.title);
  const totalScore = useSelector((state) => state.gameReducer.totalScore);
  const totalTimeLimit = useSelector(
    (state) => state.gameReducer.totalTimeLimit
  );
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(props);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const offGame = () => {
    // 게임 점수 저장 코드 필요
    navigate("/main"); // /emoji 경로로 이동
  };

  const moreGame = () => {
    // 게임 점수 저장 및 첫번째 게임으로 다시 돌아가자
    navigate("/emoji");
  };
  return (
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
              onClick={handleClickOpen}
              sx={{
                textAlign: "center",
                color: "black",
              }}
            >
              <div>
                <div style={{ fontSize: "1.2rem" }}>점수</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    margin: 10,
                  }}
                >
                  <img src={coin} alt="" style={{ width: "1.2rem" }} />
                  <div style={{ marginLeft: 5 }}>{totalScore} M</div>
                </div>
              </div>
            </Box>
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
                {round} of 12 ROUND
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
                ~ {title} ~
              </div>
            </Box>

            <Box
              sx={{
                textAlign: "center",
                color: "black",
              }}
            >
              <div style={{ fontSize: "1.2rem" }}>남은시간</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "1.2rem",
                  margin: 10,
                }}
              >
                <img src={time} alt="" style={{ width: "1.9rem" }} />
                <div style={{ marginLeft: 7 }}>{totalTimeLimit}</div>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HeaderComp>
  );
}
export default Header;
