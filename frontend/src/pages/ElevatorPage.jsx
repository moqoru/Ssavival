import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ElevatorGame from "../components/game/ElevatorGame";
import GameComp from "../components/game/GameComp";
import GameComp2 from "../components/game/GameComp2";
import Header from "../components/game/Header";
import "../index.css";
import game from "../assets/game.png";

const Pages = styled.div`
  background-image: url(${game});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function ElevatorPage() {
  // const gameMode = useSelector((state) => state.gameMode);
  return (
    <Pages>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1%",
          height: "100vh",
        }}
      >
        <GameComp>
          <ElevatorGame />
        </GameComp>
        {/* {gameMode === "single" ? (
          <GameComp props={myProps}>
            <ElevatorGame {...myProps} />
          </GameComp>
        ) : (
          <GameComp2 props={myProps}>
            <ElevatorGame {...myProps} />
          </GameComp2>
        )} */}
      </div>
    </Pages>
  );
}
