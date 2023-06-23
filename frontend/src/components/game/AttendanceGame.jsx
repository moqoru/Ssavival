import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import buttonLeave from "../../assets/game_attendance/button_leave.png";
import buttonLeaveHover from "../../assets/game_attendance/button_leave_hover.png";
import bannerAttendance from "../../assets/game_attendance/banner_attendance.png";
import bannerClear from "../../assets/game_attendance/banner_clear.png";
import { useDispatch, useSelector } from "react-redux";

const AttendanceGame = () => {
  const buttonRunCount = 10;
  // const [minigameClear, setMinigameClear] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [moveCount, setMoveCount] = useState(0);

  const [position, setPosition] = useState({
    top: 162,
    left: 420,
  });

  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setButtonHover(true);

    if (moveCount < buttonRunCount) {
      if (moveCount + 1 === buttonRunCount) {
        setPosition({
          top: 162,
          left: 420,
        });
      } else {
        let movedTop = position.top;
        let movedLeft = position.left;
        while (
          movedTop > position.top - 130 &&
          movedTop < position.top + 130 &&
          movedLeft > position.left - 130 &&
          movedLeft < position.left + 130
        ) {
          movedTop = Math.random() * 300;
          movedLeft = Math.random() * 500;
        }
        setPosition({
          top: movedTop,
          left: movedLeft,
        });
      }
      setMoveCount(moveCount + 1);
    }
  };

  const handleMouseLeave = () => {
    setButtonHover(false);
  };

  const handleClick = () => {
    if (moveCount === buttonRunCount) {
      if (minigameActive) {
        dispatch({ type: "SET_MINIGAME_CLEAR" });
      }
    }
  };

  return (
    <OutsideContainer>
      <ButtonContainer>
        <img
          src={minigameClear ? bannerClear : bannerAttendance}
          alt="Banner"
        />
        <Box>
          {minigameClear ? null : (
            <LeaveButtonImg
              src={buttonHover ? buttonLeaveHover : buttonLeave}
              alt="Leave Button"
              style={{ top: position.top, left: position.left }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
          )}
        </Box>
      </ButtonContainer>
    </OutsideContainer>
  );
};

export default AttendanceGame;

const OutsideContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const LeaveButtonImg = styled.img`
  width: 130px;
  height: 130px;
  position: absolute;
  border: 5px solid red;
  cursor: pointer;
`;
