import React from "react";
import styled from "styled-components";
import IdCardComp from "../components/game/IdCardComp";
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

export default function IdCardPage() {
  const gameMode = useSelector((state) => state.gameMode);
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
        {gameMode === "single" ? (
          <GameComp>
            <IdCardComp />
          </GameComp>
        ) : (
          <GameComp2>
            <IdCardComp />
          </GameComp2>
        )}
      </div>
    </Pages>
  );
}
