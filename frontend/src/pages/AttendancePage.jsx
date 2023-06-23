import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GameComp from "../components/game/GameComp";
import GameComp2 from "../components/game/GameComp2";
import Header from "../components/game/Header";
import AttendanceGame from "../components/game/AttendanceGame";
import game from "../assets/game.png";

const Pages = styled.div`
  position: relative;
  background-image: url(${game});
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export default function AttendancePage() {
  const gameMode = useSelector((state) => state.gameMode);
  return (
    <Pages>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {gameMode === "single" ? (
          <GameComp>
            <AttendanceGame />
          </GameComp>
        ) : (
          <GameComp2>
            <AttendanceGame />
          </GameComp2>
        )}
      </div>
    </Pages>
  );
}
