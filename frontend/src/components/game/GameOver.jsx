/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import menu from "../../assets/menu.png";
import yes from "../../assets/yes.png";
import onemore from "../../assets/onemore.png";
import share from "../../assets/share.png";
import { shareKakao } from "../../utils/shareKakaoLink";
import {
  REST_API_KEY,
  REDIRECT_URI,
  LOGOUT_REDIRECT_URI,
  APP_ADMIN_KEY,
} from "../KakaoLoginData";
import { GameAction } from "../../redux/actions/GameAction";
import { MainAction } from "../../redux/actions/MainAction";
import { fetchQuizImage } from "../../redux/actions/DifferenceGameAction";

const Comp = styled.div`
  font-family: "neodgm";
`;

function GameOver(props) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };

  const gameMode = useSelector((state) => state.gameReducer.gameMode);
  const totalScore = useSelector((state) => state.gameReducer.totalScore);
  const round = useSelector((state) => state.gameReducer.round);
  const userId = localStorage.getItem("userId");
  const challengeInfo = useSelector((state) => state.mainReducer.challengeInfo);
  const nickname = useSelector((state) => state.mainReducer.nickname);

  // 게임 종료 눌렀을 때
  const offGame = () => {
    const finalData = {
      gameId: localStorage.getItem("gameId"),
      totalScore: totalScore,
      gameDate: Date.now(), //현재 시간
      userId: userId,
    };

    // dispatch(GSameAction.setGameDone(finalData));

    if (gameMode == "multi") {
      const result1 = {
        userId: userId,
        status:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 0
            : 1, //0승 ,1패 , 2무
      };
      const result2 = {
        userId: challengeInfo.challengeId,
        status:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 1
            : 0, //0승 ,1패 , 2무
      };

      const recordData1 = {
        isWin:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 1
            : 0, //0승 ,1패 , 2무,
        date: Date.now(),
        challengerId: challengeInfo.challengeId,
        challengerNickname: challengeInfo.challengeNickname,
        userNickname: nickname,
        userId: localStorage.getItem("userId"),
      };

      const recordData2 = {
        isWin:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 0
            : 1, //0승 ,1패 , 2무,
        date: Date.now(),
        challengerId: localStorage.getItem("userId"),
        challengerNickname: nickname,
        userNickname: challengeInfo.challengeNickname,
        userId: challengeInfo.challengeId,
      };
      dispatch(MainAction.patchStatistics(result1));
      dispatch(MainAction.patchStatistics(result2));
      dispatch(MainAction.postRecord(recordData1));
      dispatch(MainAction.postRecord(recordData2));
    } else {
      dispatch(GameAction.setGameDone(finalData));
    }
    navigate("/main");
  };

  // 한 번 더 눌렀을 때
  const moreGame = () => {
    const finalData = {
      gameId: localStorage.getItem("gameId"),
      totalScore: totalScore,
      gameDate: Date.now(), //현재 시간
      userId: userId,
    };
    // dispatch(GameAction.setGameDone(finalData));
    if (gameMode == "multi") {
      const result1 = {
        userId: userId,
        status:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 0
            : 1, //0승 ,1패 , 2무
      };
      const result2 = {
        userId: challengeInfo.challengeId,
        status:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 1
            : 0, //0승 ,1패 , 2무
      };
      const recordData1 = {
        isWin:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 1
            : 0, //0승 ,1패 , 2무,
        date: Date.now(),
        challengerId: challengeInfo.challengeId,
        challengerNickname: challengeInfo.challengeNickname,
        userNickname: nickname,
        userId: localStorage.getItem("userId"),
      };

      const recordData2 = {
        isWin:
          challengeInfo.challengeTotalScore == totalScore
            ? 2
            : challengeInfo.challengeTotalScore < totalScore
            ? 0
            : 1, //0승 ,1패 , 2무,
        date: Date.now(),
        challengerId: localStorage.getItem("userId"),
        challengerNickname: nickname,
        userNickname: challengeInfo.challengeNickname,
        userId: challengeInfo.challengeId,
      };
      dispatch(MainAction.patchStatistics(result1));
      dispatch(MainAction.patchStatistics(result2));
      dispatch(MainAction.postRecord(recordData1));
      dispatch(MainAction.postRecord(recordData2));
    } else {
      dispatch(GameAction.setGameDone(finalData));
    }
    dispatch({ type: "SET_GAME_MODE", payload: { gameMode: "single" } });
    dispatch({ type: "RESET_ROUND" });
    dispatch(GameAction.getRemindAnswer("한식"));
    dispatch(GameAction.getKarloImage("classroom"));
    dispatch(GameAction.gameStart(localStorage.getItem("userId")));
    dispatch(fetchQuizImage());
    navigate("/start"); // /start 경로로 이동
    // window.location.replace("/game");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  //  카카오 로그인
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Comp>
      <Dialog open={open} onClose={handleClose}>
        <img src={menu} alt="" />
        <Typography
          sx={{
            fontFamily: "neodgm",
            position: "absolute",
            top: "36%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
          }}
          variant="h6"
        >
          {totalScore} M
        </Typography>
        <Typography
          sx={{
            fontFamily: "neodgm",
            position: "absolute",

            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#FFD525",
          }}
          variant="h6"
        >
          게임을 종료하시겠습니까?
        </Typography>
        <div>
          <img
            src={yes}
            alt=""
            style={{
              position: "absolute",
              top: "80%",
              left: "35%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
            onClick={offGame}
          />
          <img
            src={onemore}
            alt=""
            style={{
              position: "absolute",
              top: "80%",
              left: "65%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
            onClick={moreGame}
          />
        </div>
        <div>
          <img
            src={share}
            alt=""
            style={{
              position: "absolute",
              top: "92%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              width: "40%",
            }}
            onClick={() => shareKakao()}
          />
        </div>
      </Dialog>
    </Comp>
  );
}
export default GameOver;
