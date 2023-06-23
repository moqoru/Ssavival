import { useState, useEffect } from "react";
import styled from "styled-components";
import countbox from "../../assets/countbox.png";
import { useDispatch, useSelector } from "react-redux";

export default function TissueGame() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    flexDirection: "column",
  };

  const imageStyle = {
    position: "absolute",
    width: "100%",
    height: "auto",
    maxWidth: "400px",
  };

  const image1Style = {
    top: 253,
    width: 350,
    position: "absolute",
    zIndex: 99,
  };

  const image2Style = {
    position: "relative",
    top: -130,
    width: 350,
    left: "5%",
    zIndex: 100,
  };

  const image3Style = {
    position: "absolute",
    width: 350,
    top: 400,
    zIndex: 99,
  };

  const CountComp = styled.div`
    font-family: "neodgm";
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
  `;
  const CountText = styled.span`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: #fecf28;
    text-shadow: 0 0 3px black;
  `;

  const [isDragging, setIsDragging] = useState(false);
  const [initialMouseY, setInitialMouseY] = useState(0);
  const [initialImageY, setInitialImageY] = useState(0);

  const [imagePosition, setImagePosition] = useState(0);
  const images = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
  ];

  const [count, setCount] = useState(0);

  // const gameData = {
  //   title: "제한 시간 내 주어진 명령어를 모두 입력하라",
  //   timeLimit: 10,
  //   bgPath: "",
  // };
  // useEffect(() => {
  //   dispatch({ type: "SET_GAME", payload: gameData });
  // }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setInitialMouseY(e.clientY);
    setInitialImageY(e.target.offsetTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dy = initialMouseY - e.clientY;
    e.target.style.top = `${initialImageY - dy}px`;
    const dyy = e.movementY;
    const newImagePosition = imagePosition - dyy / 20;
    if (newImagePosition >= 0 && newImagePosition < images.length) {
      setImagePosition(newImagePosition);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    setInitialImageY(e.target.offsetTop);

    if (imagePosition > images.length - 1) {
      setCount(count + 1);
      setImagePosition(0);
    }
  };

  const handleMouseOut = (e) => {
    setIsDragging(false);
    setInitialImageY(e.target.offsetTop);
    if (imagePosition > images.length - 1) {
      setCount(count + 1);
      setImagePosition(0);
    }
  };

  const dispatch = useDispatch();

  // 미니게임 클리어 여부
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  // 미니게임 작동 여부
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  useEffect(() => {
    if (count === 5) {
      if (minigameActive) {
        dispatch({ type: "SET_MINIGAME_CLEAR" });
      }
    }
  }, [count]);

  return (
    <div>
      <CountComp>
        <img src={countbox} alt=" " style={{ width: "150px" }}></img>
        <CountText>{count}</CountText>
      </CountComp>

      <div style={containerStyle}>
        <img
          src="고양이_휴지곽_뒷면.png"
          alt=""
          style={{ ...imageStyle, ...image1Style }}
        ></img>
        <div style={{ ...imageStyle, ...image2Style }}>
          <div>
            <img
              src={images[Math.floor(imagePosition)]}
              // srt="1.png"
              // src={require(images[Math.floor(imagePosition)]).default}
              alt="example"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseOut}
              draggable="false"
            />
          </div>
        </div>
        <img
          src="고양이_휴지곽_앞면.png"
          alt=""
          style={{ ...imageStyle, ...image3Style }}
        ></img>
      </div>
    </div>
  );
}
