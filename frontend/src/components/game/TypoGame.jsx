import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import typo1 from "../../assets/game_typo/Typo1.png";
import typo2 from "../../assets/game_typo/Typo2.png";
import typo3 from "../../assets/game_typo/Typo3.png";
import scoring from "../../assets/game_typo/scoring.gif";
import { useDispatch } from "react-redux";

// 오타 위치 좌표
const typoSpots = [
  [
    {
      x: 417.92048592511196,
      y: 527.1409033933193,
      found: false,
      letter: "끊",
    },
    { x: 342.7137573875479, y: 786.9067143330626, found: false, letter: "얻" },
    { x: 593.5875093498555, y: 786.9067143330626, found: false, letter: "되" },
  ],
  [
    {
      x: 309.7461568261866,
      y: 440.18809119880666,
      found: false,
      letter: "개",
    },
    { x: 840.0631412228695, y: 438.923064273777, found: false, letter: "제" },
    { x: 515.6150259749427, y: 894.4804794709338, found: false, letter: "쌓" },
  ],
  [
    {
      x: 268.837121383163,
      y: 531.6051104806425,
      found: false,
      letter: "습",
    },
    { x: 440.29166930071034, y: 621.5672329926813, found: false, letter: "서" },
    { x: 192.71212025428713, y: 713.8967797813528, found: false, letter: "의" },
  ],
];

// 맞힌 개수 표시
const styles = {
  position: "absolute",
  fontFamily: "neodgm",
  fontWeight: "bolder",
  fontSize: "40px",
};

export default function TypoGame() {
  //소리 효과
  const pencilSound = new Audio("/soundEffect/pencil.mp3");
  const blobSound = new Audio("/soundEffect/blob.mp3");

  const dispatch = useDispatch();

  // 자소서 랜덤 선택 및 소리효과 설정
  const typoImgList = [typo1, typo2, typo3];
  const [index, setIndex] = useState(
    Math.floor(Math.random() * typoImgList.length)
  );
  const typoImg = typoImgList[index];

  // 찾은 typoSpot 리스트
  const [foundSpots, setFoundSpots] = useState([]);

  // canvas 기본 설정
  const canvasRef = useRef(null);
  const [getCtx, setGetCtx] = useState(null);

  // canvas 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    // canvas 배경 이미지 넣기
    const bgImg = new Image();
    bgImg.src = typoImg;
    bgImg.onload = function () {
      ctx.drawImage(bgImg, 0, 0, 1000, 1000);

      // 이미지 로드된 이후 오타 박스 넣기
      // (이미지가 canvas를 covers하기 때문에 cover image 넣은 뒤 rectangle 넣도록 순서 주의)
      typoSpots[index].forEach((spot) => {
        if (spot.found) {
          ctx.fillStyle = "#e4e5e5";
          ctx.fillRect(spot.x - 15, spot.y - 25, 35, 55);
          ctx.fillStyle = "blue";
          ctx.font = "2.5vw ChosunSm";
          ctx.fillText(spot.letter, spot.x - 15, spot.y + 15);
        }
      });
    };
    setGetCtx(ctx);
  }, [foundSpots]);

  // Mouse Event 사용하여 그림그리기
  const [painting, setPainting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const drawFn = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setMousePos({ x, y });

    if (!painting) {
      // getCtx.beginPath();
      getCtx.moveTo(mousePos.x, mousePos.y);
    } else {
      getCtx.lineTo(mousePos.x, mousePos.y);
      getCtx.stroke();
    }
  };

  // 찾은 오타 표시(useState hook을 사용하는 경우 state값 변경이 asynchronous한 것 주의)
  function handleSpotClick(spot) {
    spot.found = true;
    setFoundSpots(() => {
      const updated = [...foundSpots, spot];
      if (updated.length === typoSpots[index].length) {
        dispatch({ type: "SET_MINIGAME_CLEAR" });
      }
      return updated;
    });
  }

  // Typo spot 클릭하면(=오타 찾으면) handleSpotClick 실행
  function handleCanvasClick() {
    console.log(mousePos.x, mousePos.y);
    let flag = false;
    typoSpots[index].forEach((spot) => {
      const dx = mousePos.x - spot.x;
      const dy = mousePos.y - spot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50 && !spot.found) {
        pencilSound.play();
        setIsScoring(true);
        handleSpotClick(spot);
        flag = true;
      }
    });
    if (!flag) {
      blobSound.play();
    }
  }

  // 채점 효과(with scoring.gif)
  const [isScoring, setIsScoring] = useState(false);
  if (isScoring) {
    setTimeout(() => {
      setIsScoring(false);
    }, 800);
  }

  return (
    <Box
      className="typo"
      width="500px"
      height="510px"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        Padding: "10px",
      }}
    >
      <canvas
        width={1000}
        height={1300}
        style={{ height: "100%" }}
        ref={canvasRef}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={(e) => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
        onClick={handleCanvasClick}
      ></canvas>

      {/* 진행 상황 표시 */}
      <Box
        sx={{
          position: "absolute",
          width: "50px",
          height: "50px",
          top: "48%",
          left: "73%",
        }}
      >
        <Box sx={{ ...styles, fontSize: "2.5vw", color: "red" }}>
          {foundSpots.length}
        </Box>
        <Box sx={{ ...styles, fontSize: "2.5vw", right: "14px", top: "9px" }}>
          /
        </Box>
        <Box sx={{ ...styles, fontSize: "2vw", right: "5px", top: "26px" }}>
          {typoSpots[index].length}
        </Box>
      </Box>

      {/* 채점 효과 */}
      {isScoring && (
        <img
          src={scoring}
          alt="scoring.gif"
          style={{ position: "absolute", width: "50%", height: "50%" }}
        />
      )}
    </Box>
  );
}
