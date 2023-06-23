import { Box, Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import slotMachine from "../../assets/interval/slotMachine.png";
import lose from "../../assets/interval/lose.gif";
import win2 from "../../assets/interval/win2.gif";
import tv from "../../assets/interval/tv.png";
import money from "../../assets/interval/money.gif";
import crying from "../../assets/interval/crying.gif";
import curtain from "../../assets/interval/curtain.png";
import { useEffect, useState } from "react";

export default function Interval() {
  const gameMode = useSelector((state) => state.gameReducer.gameMode);

  //소리 효과
  const applauseSound = new Audio("/soundEffect/applause.mp3");
  const fireworkSound = new Audio("/soundEffect/firework.mp3");
  const loseSound = new Audio("/soundEffect/lose.mp3");

  const [open, setOpen] = useState(true);

  // 승패 확인 및 gif 사용
  const score = useSelector((state) => state.gameReducer.score);

  let text = null;
  let simpsonGif = null;
  let gif = null;

  if (score) {
    text = "WIN";
    simpsonGif = win2;
    gif = money;
  } else {
    text = "LOSE";
    simpsonGif = lose;
    gif = crying;
  }

  useEffect(() => {
    if (score) {
      const sounds = [applauseSound, fireworkSound];
      const i = Math.floor(Math.random() * sounds.length);
      sounds[i].play();
      setTimeout(() => {
        sounds[i].pause();
      }, 3000);
    } else {
      loseSound.play();
      setTimeout(() => {
        loseSound.pause();
      }, 3000);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        transform:
          gameMode == "single" ? "translate(75%,21%)" : "translate(131.5%,21%)",
        zIndex: 999,
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        border: "none", // 테두리 없애기
        borderRadius: 10,
        boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
        backgroundColor: "white",
        padding: 3,
        maxWidth: "40%", // 최대 너비 값 설정
        width: "100%",
        height: "72vh",
        overflow: "hidden",
        // marginRight: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100%",
          borderRadius: 10,
          backgroundColor: "white",
          backgroundImage: `url(${curtain})`,
          backgroundSize: "cover",
          padding: 5,
        }}
      >
        {/* text */}
        <Box
          className="vibration"
          sx={{ fontFamily: "ddalgi", fontSize: "5vw" }}
        >
          {text}
        </Box>

        {/* 점수 */}
        <Box
          className="vibration"
          sx={{
            fontFamily: "ddalgi",
            fontSize: "3vw",
            backgroundImage: `url(${money})`,
            backgroundSize: "cover",
          }}
        >
          + {score}
        </Box>

        {/* tv */}
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            transform: "translate(-7%,-37%)",
            width: "220px",
            height: "140px",
            marginTop: "80px",
          }}
        >
          <img
            src={simpsonGif}
            style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
          />
        </Box>
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            width: "350px",
            height: "280px",
          }}
        >
          <img
            src={tv}
            style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
          ></img>
        </Box>

        {/* slotMachine */}
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
        <img
        src={slotMachine}
        style={{
          position: "absolute",
          width: "150px",
          // transform: "transition(-10%,0)",
        }}
        />
        </Box>
        
        <Box
        sx={{
          overflow: "hidden",
        }}
        >
          <Flow
          style={{
            border: "1px solid black",
            width: "50px",
            height: "110px",
            overflow: "hidden",
            whiteSpace: "pre-line",
          }}
          >
          {text}
          </Flow>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
