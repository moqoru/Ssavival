import React, { useRef, useEffect, useState } from "react";
import Header from "../components/game/Header";
import "../index.css";
import Box from "@mui/material/node/Box";
import GitbashGame from "../components/game/GitbashGame";
import TypoGame from "../components/game/TypoGame";
import { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import TimerBomb from "../components/game/TimerBomb";
import TissueGame from "../components/game/TissueGame";
import ElevatorGame from "../components/game/ElevatorGame";
import RemindGame from "../components/game/RemindGame";
import EmojiComp from "../components/game/EmojiComp";
import LockerGame from "../components/game/LockerGame";
import AttendanceGame from "../components/game/AttendanceGame";
import Puzzle from "../components/game/PuzzleComp";
import Seating from "../components/game/SeatComp";
import IdCard from "../components/game/IdCardComp";

import html2canvas from "html2canvas";
import { GameAction } from "../redux/actions/GameAction";
import Interval from "../components/game/Interval";
import money from "../../src/assets/interval/money.gif";
import GameOver from "../components/game/GameOver";
// import ImagePlayer from "../components/game/ImagePlayer";

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1%",
  height: "100vh",
};

const gameContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexWrap: "wrap",
  border: "none", // 테두리 없애기
  borderRadius: 10,
  boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
  padding: 3,
  maxWidth: "40%", // 최대 너비 값 설정
  width: "100%",
  height: "72vh",
  overflow: "hidden",
  marginRight: 10, //
};

const Comp = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
};

export default function IntervalPage() {
  return (
    <Box
      style={{
        backgroundSize: "cover",
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      <Header />
      <Box sx={container}>
        <Box
          sx={{
            ...gameContainer,
            backgroundImage: `url(${money})`,
            backgroundSize: "cover",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // 배경색 투명하게 만들기
            padding: 0,
          }}
        >
          <GameOver />
        </Box>
      </Box>
    </Box>
  );
}
