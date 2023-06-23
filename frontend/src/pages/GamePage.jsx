import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/game/Header";
import "../index.css";
import Box from "@mui/material/node/Box";
import GitbashGame from "../components/game/GitbashGame";
import TypoGame from "../components/game/TypoGame";
import { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import TimerBomb from "../components/game/TimerBomb";
import TissueGame from "../components/game/TissueGame";
import ElevatorGame from "../components/game/ElevatorGame";
import RemindGame from "../components/game/RemindGame";
import EmojiComp from "../components/game/EmojiComp";
import LockerGame from "../components/game/LockerGame";
import AttendanceGame from "../components/game/AttendanceGame";
import Puzzle from "../components/game/PuzzleComp";
import Seating from "../components/game/SeatComp";
import IdCard from "../components/game/IdCardComp";
import DifferenceGame from "../components/game/DifferenceGame";
import IPGame from "../components/game/IPGame";
import html2canvas from "html2canvas";
import { GameAction } from "../redux/actions/GameAction";
// import ImagePlayer from "../components/game/ImagePlayer";
import classroom from "../assets/backgrounds/classroom.png";
import confetti from "canvas-confetti";
import Interval from "../components/game/Interval";
import GameOver from "../components/game/GameOver";

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1%",
  height: "100vh",
};

const gameContainer = {
  display: "flex",
  // alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  border: "none", // 테두리 없애기
  borderRadius: 10,
  boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
  backgroundColor: "rgba(255, 255, 255, 0.7)", // 배경색 투명하게 만들기
  padding: 3,
  maxWidth: "40%", // 최대 너비 값 설정
  width: "100%",
  height: "72vh",
  overflow: "hidden",
  // marginRight: 10,
};

const Comp = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
};

const Text = styled.div`
  font-family: neodgm;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  /* font-family: neodgm;
  width: 95%;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 10px; */
`;

export default function GamePage() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  // redux에서 게임 정보 가져오기
  const gameMode = useSelector((state) => state.gameReducer.gameMode);
  const pageBg = useSelector((state) => state.gameReducer.pageBg);
  const containerBg = useSelector((state) => state.gameReducer.containerBg);
  const inter = useSelector((state) => state.gameReducer.interval);
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );
  const round = useSelector((state) => state.gameReducer.round);
  const gameTitleData = useSelector((state) => state.gameReducer.gameTitleData);
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);
  const score = useSelector((state) => state.gameReducer.score);

  const [gameOver, setGameOver] = useState(false);
  const [flag, setFlag] = useState(false);
  const [inputs, setInputs] = useState({});
  // const [openScore, setOpenScore] = useState(false);

  // 갈아끼울 게임 컴포넌트 리스트
  const gameComps = [
    <GitbashGame key="GitbashGame" />,
    <LockerGame key="LockerGame" />,
    <TypoGame key="TypoGame" />,
    <IPGame key="IPGame" />,
    <RemindGame key="RemindGame" />,
    <TissueGame key="TissueGame" />,
    <EmojiComp key="EmojiComp" />,
    <IdCard key="Idcard" />,
    <Seating key="Seating" />,
    <Puzzle key="Puzzle" />,
    <AttendanceGame key="AttendanceGame" />,
    <DifferenceGame key="DifferenceGame" />,
  ];

  // 게임 페이지 마운트되면 "SET_MINIGAME_START" dispatch 보내기
  useEffect(() => {
    dispatch({ type: "SET_MINIGAME_START" });
  }, []);

  // 렌더링 후 minigameActive 값이 false가 되면 3초만큼 기다린 후 setIndex를 바꾼 뒤 SET MINIGAME START 실행
  useEffect(() => {
    let timeoutId = null;

    if (!minigameActive && round < gameTitleData.length) {
      timeoutId = setTimeout(() => {
        dispatch({ type: "SET_MINIGAME_START" });

        const data = {
          //리스트의 userid 빼오기
          userId: localStorage.getItem("userId"),
          round: round + 1,
        };
        dispatch(GameAction.getGameRecord(data));
      }, 3000);
    } else if (!minigameActive && round == gameComps.length) {
      setTimeout(() => {
        setGameOver(true); // 마지막 라운드가 끝나면 GameOver 컴포 띄우기
      }, 3000);
    }
    // else if (round === gameTitleData.length) {
    //     setGameOver(true)
    //   }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, gameTitleData, round, minigameActive]);

  // 아래로는 녹화 관련 코드로 추정
  useEffect(() => {
    if (round != 0) {
      if (gameMode === "single") {
        let count = 0;
        let interval = setInterval(() => {
          console.log("minigame clear", minigameClear);
          if (minigameActive) {
            console.log("check 134");
            onCapture(count);
            count++;
            // console.log("COUNT", count);
          }
          //20장 캡쳐완료 시
          // console.log("MINIGame Active", minigameActive);
          if (!minigameActive) {
            console.log("Check  145");
            onCapture(count);
            clearInterval(interval);
            // setOpenScore(true);
            setTimeout(() => {
              // setOpenScore(false);
            }, 2500); //3초 대기
            // return;
          }
        }, 500);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [round, minigameClear, minigameActive]);

  const [blobArray, setBlobArray] = useState([]);
  const [blobs, setBlobs] = useState([]);

  const onCapture = (count) => {
    html2canvas(document.getElementById("gameContainer"), {
      useCORS: true,
    }).then((canvas) => {
      // onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
      canvas.toBlob((blob) => {
        if (!minigameClear) {
          setBlobs((prevBlobs) => [...prevBlobs, blob]);
          console.log("onCapture", blob.length, blob);
        }

        // console.log(blobs)
        // console.log("LeNNNNNNNNNNNNNNNN", count);
        //이미지 20장 찍거나 게임 클리어했을 경우
        if (minigameClear || !minigameActive) {
          console.log("EEEEEEEEEEEEEEEND", blobs.length);
          //점수, 시간, 아이디 저장
          setBlobArray(blobs);
          console.log("SCore", score);
          setInputs({
            miniGameDetail: { miniGameDetailId: round },
            clearTime: "",
            score: score,
            gameId: localStorage.getItem("gameId"), //게임 시작 api에서 받아서 가져올 부분
            createdTime: new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          });
          setFlag(true);
        }
      }, "image/png");
    });
  };

  const [flag2, setFlag2] = useState(0);

  useEffect(() => {
    if (flag) {
      console.log("SAVE BLOB ARRAY", blobArray);
      console.log("INPUTS ", inputs);

      saveBlobs();
      setFlag2(1 - flag2);
    }
  }, [flag]);

  useEffect(() => {
    if (flag) {
      setFlag(false);
    }
  }, [flag2]);

  const saveBlobs = () => {
    console.log("save blobs");
    const formData = new FormData();
    console.log(blobArray);
    for (let i = 0; i < blobArray.length; i++) {
      formData.append("gameImages", blobArray[i], `image${i}.png`);
    }

    console.log("INPUTS ", inputs);

    //inputs를 blob형태로 변경
    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("miniGame", blob);

    dispatch(GameAction.gameDone(formData));
    setInputs({});
    setBlobArray([]);
    setBlobs([]);
    setFlag(false); // Set flag to false here to prevent multiple executions
  };

  const images = useSelector((state) => state.gameReducer.gameRecord);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("IMAGES", images);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  // 정답 맞추면 꽃가루 효과
  function firework() {
    var duration = 15 * 100;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 25, spread: 360, ticks: 100, zIndex: 0 }; //  startVelocity: 범위, spread: 방향, ticks: 갯수

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  }

  useEffect(() => {
    if (minigameClear) {
      firework();
    }
  }, [minigameClear]);

  return (
    <Box
      style={{
        backgroundImage: `url(${pageBg})`,
        // backgroundImage: inter ? `url(${classroom})` : `url(${pageBg})`,
        backgroundSize: "cover",
        position: "relative",
        width: "100%",
        height: "auto",
      }}
    >
      {minigameActive ? "" : <Interval />}
      {gameOver ? <GameOver /> : ""}
      <Header />
      <Box sx={container}>
        {gameMode === "single" ? (
          <Box
            sx={{
              ...gameContainer,
              // boxShadow:
              //   pageBg === "class_desk" || "laptop"
              //     ? "none"
              //     : "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
              // backgroundColor:
              //   pageBg === "class_desk" || "laptop"
              //     ? "none"
              //     : "rgba(255, 255, 255, 0.7)", // 배경색 투명하게 만들기
              backgroundImage: inter ? "" : `url(${containerBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <TimerBomb />
            <Box ref={canvasRef} id="gameContainer">
              {gameComps[round - 1]}
            </Box>
          </Box>
        ) : (
          <Box sx={Comp}>
            <Box sx={gameContainer}>
              {/* checkkkkkkkkkkkkkkkkkkkkk */}
              {/* <Text>상대방 게임 녹화화면</Text> */}
              <TimerBomb />
              {images.length > currentIndex && (
                <img
                  src={images[currentIndex].imageUrl}
                  alt="Slider"
                  style={{
                    padding: 5,
                    width: "95%",
                    height: "auto",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                ...gameContainer,
                backgroundImage: `url(${containerBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <TimerBomb />
              {gameComps[round - 1]}
            </Box>
          </Box>
        )}
      </Box>
      {gameOver ? <GameOver /> : ""}
    </Box>
  );
}
