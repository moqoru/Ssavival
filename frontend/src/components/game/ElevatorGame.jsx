import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import elevator from "../../assets/elevator.png";
import balloon from "../../assets/balloon.png";
import girl from "../../assets/girl.png";
import { useDispatch } from "react-redux";

const ElevatorImageWrapper = styled.div`
  position: relative;
`;

const ElevatorImage = styled.img`
  width: 120px;
  height: 80px;
  position: relative;
  animation: moveUpDown 1.2s ease-in-out infinite;
  z-index: 2;

  @keyframes moveUpDown {
    0% {
      transform: translateY(450px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(450px);
    }
  }
`;
const CenterBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 450px;
  display: flex;
  flex-direction: column;
`;
const FloorComp = styled.div`
  font-family: "neodgm", sans-serif;
  font-size: 1.7rem;
  color: black;
`;
const ScoreComp = styled.div`
  font-family: "neodgm", sans-serif;
  font-size: 1.7rem;
  color: black;
`;
const Floor = styled.div`
  flex: 1;
  background-color: ${(props) => (props.active ? "yellow" : "transparent")};
`;

export default function ElevatorGame() {
  const [floor, setFloor] = useState(Math.floor(Math.random() * 5) + 1);
  const [score, setScore] = useState(0);
  const [overlap, setOverlap] = useState(false);

  const dispatch = useDispatch();
  const targetFloorRef = useRef(null);

  // const gameData = {
  //   title: "제한 시간 내 주어진 명령어를 모두 입력하라",
  //   timeLimit: 10,
  //   bgPath: "",
  // };
  // useEffect(() => {
  //   dispatch({ type: "SET_GAME", payload: gameData });
  // }, []);

  const checkOverlap = () => {
    const diff = Math.abs(floor - 5);
    const newOverlap = diff <= 2;
    setOverlap(newOverlap);
    return newOverlap;
  };

  const increaseScore = () => {
    if (overlap) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        increaseScore();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [floor, score]);

  const floors = [];
  for (let i = 1; i <= 5; i++) {
    floors.push(
      <Floor key={i} active={floor === i}>
        {i}
      </Floor>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ width: "30%" }}>
        <FloorComp>Floor: {floor} </FloorComp>
        <ScoreComp>Score: {score}</ScoreComp>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "40%",
        }}
      >
        <ElevatorImageWrapper>
          <ElevatorImage src={elevator} alt="" />
          <CenterBox>{floors}</CenterBox>
        </ElevatorImageWrapper>
      </Box>
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={girl} alt=" " style={{ width: "50px" }} />
        <br />
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={balloon} alt="" style={{ width: "150px" }} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p
              style={{
                fontFamily: "neodgm",
                fontSize: "1rem",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              {floor}층으로 가고싶어!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
