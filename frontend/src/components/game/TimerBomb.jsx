import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import bombIdle from "../../assets/timer/bomb_idle.png";
import bombBoom from "../../assets/timer/bomb_boom.png";
import bombRed from "../../assets/timer/bomb_red.png";
import { useDispatch, useSelector } from "react-redux";

const TimerBomb = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [before2sec, setBefore2sec] = useState(0);
  const [before1sec, setBefore1sec] = useState(0);
  const dispatch = useDispatch();

  const timerBombLimit = useSelector(
    (state) => state.gameReducer.timerBombLimit
  );
  const timerBombActive = useSelector(
    (state) => state.gameReducer.timerBombActive
  );
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (timerBombActive) {
      setTimeLeft(timerBombLimit * 1000);
      setBefore2sec(timerBombLimit - 2);
      setBefore1sec(timerBombLimit - 1);
      startTimeRef.current = Date.now();
    }
    console.log(timerBombLimit);
  }, [timerBombActive, timerBombLimit]);

  useEffect(() => {
    let animationFrameId = null;
    const updateTimer = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      // console.log(timerBombLimit, elapsedTime);
      const newTimeLeft = Math.max(0, timerBombLimit * 1000 - elapsedTime);
      setTimeLeft(newTimeLeft);

      const newProgress =
        ((timerBombLimit * 1000 - newTimeLeft) / (timerBombLimit * 1000)) * 100;
      setProgress(newProgress.toFixed(2));

      if (newTimeLeft === 0) {
        dispatch({ type: "SET_MINIGAME_FAIL", payload: 0 });
        return;
      }

      animationFrameId = requestAnimationFrame(updateTimer);
    };

    if (timerBombActive) {
      animationFrameId = requestAnimationFrame(updateTimer);
    } else if (minigameClear) {
      dispatch({ type: "UPDATE_SCORE", payload: timeLeft });
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [dispatch, minigameClear, timerBombActive, timerBombLimit, timeLeft]);

  return (
    <BarContainer>
      <BombImg
        src={
          progress < 99
            ? progress < (before1sec * 100) / timerBombLimit
              ? bombIdle
              : bombRed
            : bombBoom
        }
        alt="Bomb"
      />
      <ColoredBar
        progress={progress}
        before1sec={(before1sec * 100) / timerBombLimit}
        before2sec={(before2sec * 100) / timerBombLimit}
      >
        <GreyBar progress={progress} />
      </ColoredBar>
    </BarContainer>
  );
};

export default TimerBomb;

const BarContainer = styled.div`
  width: 95%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 10px;
`;

const BombImg = styled.img`
  width: 50px;
  height: 50px;
`;

const ColoredBar = styled(Box)`
  width: 100%;
  background-color: ${({ progress, before1sec, before2sec }) =>
    progress > before1sec
      ? "#EC2C54"
      : progress > before2sec
      ? "#FFD923"
      : "#3396F4"};
  display: flex;
  justify-content: flex-end;
`;

const GreyBar = styled(Box)`
  width: ${({ progress }) => `${progress}%`};
  height: 10px;
  background-color: #eee;
`;
