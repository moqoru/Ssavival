/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GameAction } from "../../redux/actions/GameAction";
import { fetchQuizImage } from "../../redux/actions/DifferenceGameAction";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // // 가상 대전 버튼 누르면 multiplay game으로 이동
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChallenge = (id, mileage) => {
    dispatch({
      type: "SET_CHALLENGE_INFO",
      payload: {
        challengeTotalScore: mileage,
        challengeId: id,
      },
    });
    dispatch({ type: "SET_GAME_MODE", payload: { gameMode: "multi" } });
    dispatch(GameAction.getRemindAnswer("한식"));
    // dispatch(GameAction.getKarloImage("classroom"));
    // dispatch(GameAction.gameStart(localStorage.getItem("userId")));
    dispatch(fetchQuizImage());
    navigate("/start"); // /game 경로로 이동
  };

  let content = "";
  const users = useSelector((state) => state.mainReducer.users);
  const targetUser = users.filter((user) => user.nickname.includes(inputValue));
  if (targetUser.length > 7) {
    targetUser.slice(0, 7);
  }
  if (targetUser.length && inputValue.length) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          border: "1px solid #bcb6ff",
          borderRadius: "15px",
          backgroundColor: "white",
          zIndex: 999,
          width: "81%",
          height: "50vh",
        }}
        position="absolute"
      >
        <Table sx={{ textAlign: "center", margin: "5%" }}>
          <TableBody>
            {targetUser.map((user) => (
              <TableRow>
                <TableCell
                  sx={{
                    width: "30%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "neodgm",
                  }}
                >
                  {user.nickname}
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "neodgm",
                  }}
                >
                  {user.mileage} M
                </TableCell>
                <TableCell
                  sx={{
                    padding: 0.5,
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "neodgm",
                  }}
                >
                  <Button
                    onClick={() => handleChallenge(user.userId, user.mileage)}
                    sx={{
                      fontFamily: "neodgm",
                      bgcolor: "#FFD211",
                      color: "black",
                      borderRadius: 10,
                      boxShadow: "none", // 그림자 없애기
                      "&:hover": {
                        bgcolor: "#FFD211",
                        color: "white",
                      },
                    }}
                    variant="contained"
                    endIcon={<ArrowCircleRightIcon />}
                  >
                    가상대전
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }

  return (
    <WholeBox>
      <InputBox>
        <Input
          type="text"
          placeholder="대전할 상대를 검색하세요"
          value={inputValue}
          onChange={handleChange}
        />
      </InputBox>
      {content}
    </WholeBox>
  );
}
const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  width: 400px;
  padding: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 12px;
  border: 1px solid #bcb6ff;
  border-radius: ${(props) =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-family: "neodgm";
  color: black;
  border: none;
  outline: none;
  color: black;
  font-size: 14px;
`;

const DeleteButton = styled.div`
  color: #bcb6ff;
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  color: #6c509f;
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
  position: absolute; /* set a fixed position */
  top: 60px; /* adjust the top position as needed */
  width: 178px;
`;

const DropDownItem = styled.li`
  font-size: 15px;
  padding: 12px 7px;

  &.selected {
    background-color: lightgray;
  }
`;
