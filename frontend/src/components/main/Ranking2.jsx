import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import gameReducer from "../../redux/reducers/game";
import { GameAction } from "../../redux/actions/GameAction";

import { store } from "../../redux/store";
import { fetchQuizImage } from "../../redux/actions/DifferenceGameAction";

const Rank = styled.div`
  font-family: "neodgm";
  color: black;
  div {
    text-align: center;
  }
`;
const Pag = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Ranking2(value) {
  const campus = value.value;
  console.log(campus);

  //redux에서 campus에 맞는 top 5 users 가져오기
  const users = useSelector((state) => state.mainReducer.users);
  const challengeId = useSelector(
    (state) => state.mainReducer.challengeInfo.challengeId
  );
  const [topFive, setTopFive] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (users && users.length > 0) {
      const filterUsers = users.filter((user) => user.campus === campus);

      const calculatedTopFive = filterUsers.slice(0, 5).map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
      console.log(calculatedTopFive);

      setTopFive(calculatedTopFive); // topFive 상태 업데이트
    }
  }, [users, campus]);

  // // 가상 대전 버튼 누르면 multiplay game으로 이동
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChallenge = (id, mileage, nickname) => {
    dispatch({
      type: "SET_CHALLENGE_INFO",
      payload: {
        challengeTotalScore: mileage,
        challengeId: id,
        challengeNickname: nickname,
      },
    });
    setFlag(true);
    // dispatch({ type: "SET_GAME_MODE", payload: { gameMode: "multi" } });
    // dispatch(GameAction.getRemindAnswer("한식"));
    // dispatch(GameAction.getKarloImage("classroom"));
    // dispatch(GameAction.gameStart(localStorage.getItem("userId")));
    // dispatch(fetchQuizImage());
    // navigate("/start"); // /game 경로로 이동
  };

  useEffect(() => {
    if (flag) {
      console.log("CHALLENGEID", challengeId);
      dispatch({ type: "SET_GAME_MODE", payload: { gameMode: "multi" } });
      dispatch(GameAction.getRemindAnswer("한식"));
      // dispatch(GameAction.getKarloImage("classroom"));
      // dispatch(GameAction.gameStart(challengeId));
      dispatch(fetchQuizImage());
      setFlag(false);
      navigate("/start"); // /game 경로로 이동
    }
  }, [challengeId]);

  return (
    <Rank>
      <Box sx={{ width: "100%", height: "100px" }}>
        <Table sx={{ textAlign: "center", margin: "5%" }}>
          <TableBody>
            {topFive.map((item) => (
              <TableRow key={item.rank}>
                {/* {campusRanking.map((item) => (
              <TableRow key={item.userId}> */}
                <TableCell
                  sx={{
                    width: "0%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "neodgm",
                  }}
                >
                  {item.rank}
                  {/* {item.userId} */}
                </TableCell>
                <TableCell sx={{ display: "none" }}>{item.userId}</TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "1rem",
                    fontFamily: "neodgm",
                  }}
                >
                  {item.nickname}
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
                  {item.mileage} M
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
                    onClick={() =>
                      handleChallenge(item.userId, item.mileage, item.nickname)
                    }
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
        <Pag>
          <Stack spacing={1}>
            <Pagination size="small" />
          </Stack>
        </Pag>
      </Box>
    </Rank>
  );
}
