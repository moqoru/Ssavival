import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  IconButton,
  Stack,
  InputBase,
} from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import gitbash_logo from "../../assets/game_gitbash/gitbash_logo.png";
import gitbash_bg from "../../assets/game_gitbash/monitor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitAlt } from "@fortawesome/free-brands-svg-icons";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

export default function GitbashGame() {
  const errorSound = new Audio("/soundEffect/error.mp3");

  //게임이 마운트될 때 redux값 변경
  const dispatch = useDispatch();

  // 순서대로 제시할 명령어 리스트
  const commandList = [
    ["git clone https://lab.ssafy.com/Ssavival.git"],
    ["cd Ssavival", "git checkout -b feature/gitbash"],
    ["git add .", 'git commit -m "FEAT : Idea Thinking"'],
    ["git push origin feature/gitbash"],
    ["git status", "git stash", "git stash apply"],
  ];

  const [index, setIndex] = useState(
    Math.floor(Math.random() * commandList.length)
  );
  const [order, setOrder] = useState(0);
  const [passNum, setPassNum] = useState(0);

  // folderName 변경
  let folderName = null;
  if (order >= 2) {
    folderName = "/Ssavival";
  }

  // branchName 변경
  let branchName = "master";
  if (order >= 3) {
    branchName = "feature/gitbash";
  }

  // 정답인 경우 마일리지 누적 + 아이콘 flip효과
  function onKeyPress(e) {
    if (e.key === "Enter") {
      if (e.target.value === commandList[index][order]) {
        if (passNum + 1 === commandList[index].length) {
          dispatch({ type: "SET_MINIGAME_CLEAR" });
        } else {
          console.log("정답^_^");
          setIsBouncing(true);
          setPassNum(passNum + 1);
          setOrder(order + 1);
        }
      } else {
        console.log("오답ㅠ_ㅠ");
      }
      e.target.value = null;
    }
  }

  //흐르는 텍스트 구현
  // const flowing = keyframes`
  //   0% {
  //     transform: translate3d(0, 0, 0);
  //   }
  //   100% {
  //     transform: translate3d(-500%, 0, 0);
  //   }
  // `;
  // const Flow = styled.div`
  //   animation: ${flowing} 30s linear infinite;
  // `;

  //git아이콘 bouncing effect
  const [isBouncing, setIsBouncing] = useState(false);
  if (isBouncing) {
    setTimeout(() => {
      setIsBouncing(false);
    }, 2000);
  }

  // 기타 재미 요소(git bash 우측 아이콘 클릭)
  function handleClick() {
    errorSound.play();
  }

  return (
    <Box
      className="git"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* gitbash 창 구현 */}
      <Paper
        sx={{
          backgroundColor: "#000000",
          borderRadius: "20px 20px 20px 20px",
          width: "100%",
          height: "auto",
          margin: "50px auto",
        }}
      >
        {/* 창의 상단 구현 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#DDDDDA",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <Box
            style={{
              display: "flex",
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <img
              src={gitbash_logo}
              alt="gitbash_logo"
              width="30px"
              height="20px"
              style={{
                margin: "10px",
              }}
            />
            <Typography
              fontSize="1vw"
              align="left"
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {" "}
              MINGW64:/c/Users/SSAFY/Desktop{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton fontSize="1vw" aria-label="minimize">
              <MinimizeIcon onClick={handleClick} />
            </IconButton>
            <IconButton fontSize="1vw" aria-label="maximize">
              <CropSquareIcon onClick={handleClick} />
            </IconButton>
            <IconButton fontSize="vw" aria-label="close">
              <CloseIcon onClick={handleClick} />
            </IconButton>
          </Box>
        </Box>

        {/* 창의 하단 구현 */}
        <Box
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "space-between",
            flexDirection: "column",
            paddingTop: "20px",
            paddingLeft: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              flex: "0 0 auto",
              width: "100%",
              height: "30px",
              // overflow: "hidden",
              // whiteSpace: "nowrap",
              marginBottom: "20px",
            }}
          >
            <Box
              className="blink"
              style={{ color: "white", fontSize: "1.4vw", textAlign: "center" }}
            >
              {commandList[index][order]}{" "}
            </Box>
          </Box>

          <Stack direction="row" spacing={1} marginTop="40px">
            <Typography whiteSpace={"nowrap"} fontSize="1vw" color="#00FF00">
              SSAFY@DESKTOP-DOGVPUB
            </Typography>
            <Typography whiteSpace={"nowrap"} fontSize="1vw" color="#FF00FF">
              MINGW64
            </Typography>
            <Typography
              whiteSpace={"nowrap"}
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
              fontSize="1vw"
              color="#FFFF00"
            >
              ~/Desktop{folderName}
            </Typography>
            <Typography whiteSpace={"nowrap"} fontSize="1vw" color="#00FFFF">
              ({branchName})
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color="white" fontSize="1.2vw" textAlign="left">
              $
            </Typography>
            <InputBase
              sx={{ ml: 1, flex: 1, color: "white", fontSize: "1.2vw" }}
              autoFocus={true}
              placeholder="명령문을 이곳에 입력하세요"
              inputProps={{ "aria-label": "input commands" }}
              onKeyPress={onKeyPress}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
            padding="10px"
          >
            <FontAwesomeIcon
              className={isBouncing ? "bounce" : ""}
              icon={faGitAlt}
              style={{ color: "#ffd91c", fontSize: "2vw" }}
            />
            <Typography color="white" fontSize="1.5vw" textAlign="center">
              {passNum} / {commandList[index].length}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
