import React from "react";
import styled from "styled-components";
import SeatComp from "../components/game/SeatComp";
import GameComp from "../components/game/GameComp";
import GameComp2 from "../components/game/GameComp2";
import Header from "../components/game/Header";
import "../index.css";
import game from "../assets/game.png";
import { useSelector } from "react-redux";

const Pages = styled.div`
  background-image: url(${game});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function SeatPage() {
  const gameMode = useSelector((state) => state.gameMode);
  return (
    <Pages>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        {gameMode === "single" ? (
          <GameComp>
            <SeatComp />
          </GameComp>
        ) : (
          <GameComp>
            <SeatComp />
          </GameComp>
        )}
      </div>
    </Pages>
  );
}
