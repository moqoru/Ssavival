import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import GameComp from "../components/game/GameComp";
import GameComp2 from "../components/game/GameComp2";
import Header from "../components/game/Header";
import LockerGame from "../components/game/LockerGame";
import game from "../assets/game.png";

// 추후 게임 배경 베이지색 사물함 벽으로 교체?
const Pages = styled.div`
  position: relative;
  background-image: url(${game});
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export default function LockerPage() {
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
            <LockerGame />
          </GameComp>
        ) : (
          <GameComp2>
            <LockerGame />
          </GameComp2>
        )}
      </div>
    </Pages>
  );
}
