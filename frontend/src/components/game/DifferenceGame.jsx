import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizImage } from "../../redux/actions/DifferenceGameAction";
import WrongMarker from "../../assets/game_difference/Wrong.png";
import CorrectMarker from "../../assets/game_difference/Correct.png";
import FoundMarker from "../../assets/game_difference/Found.png";
import NotFoundMarker from "../../assets/game_difference/NotFound.png";

const DifferenceGame = () => {
  const dispatch = useDispatch();
  const maxDistance = 30 * 30; // 정답으로 인정할 최대 거리 간격, 가로세로 30px
  const clearCount = 3;
  const [clickedWrong, setClickedWrong] = useState({ x: -1, y: -1, side: "" });
  const [correctInfo, setCorrectInfo] = useState(0);
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );
  const pointsCenter = useSelector((state) => state.gameReducer.pointsCenter);
  const quizImgSize = useSelector((state) => state.gameReducer.quizImgSize);
  const quizImgUrl = useSelector((state) => state.gameReducer.quizImgUrl);
  // useEffect(() => {
  //   dispatch(fetchQuizImage());
  // }, [dispatch]);

  const handleBoxClick = (e, side) => {
    // 더블클릭이 될 경우 클릭 이벤트의 target 요소가 div가 아닌 img로 바뀌는데, 이 경우에는 입력을 무시하도록 함
    if (e.target.tagName === "IMG" || !minigameActive) {
      return;
    }
    const rect = e.target.getBoundingClientRect();

    let flag = false;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 일반적인 for문으로 사용하면 리 렌더링이 되지 않으므로, map 함수를 활용함
    const newPoints = pointsCenter.map((point) => {
      const xGap = point[0] - x;
      const yGap = point[1] - y;
      const d = xGap * xGap + yGap * yGap; // 정답 지점과의 좌표 오차

      if (d <= maxDistance && point[2] === 0) {
        flag = true;
        return [point[0], point[1], 1];
      }
      return point;
    });

    if (flag) {
      setClickedWrong({ x: -1, y: -1, side: "" }); // 정답을 찾은 경우 : 오답 마커 숨김
      if (correctInfo + 1 >= clearCount) {
        dispatch({ type: "SET_MINIGAME_CLEAR" });
      }
      setCorrectInfo((prev) => prev + 1);
    } else {
      setClickedWrong({ x, y, side: side }); // 오답인 경우 : 오답 마커 표시
    }
    dispatch({ type: "UPDATE_POINTS_CENTER", payload: newPoints });
    // setPointsCenter(newPoints); // setState() 함수를 사용하지 않고 직접 수정하면, 마찬가지로 리 렌더링이 안 됨!
  };

  return (
    <>
      <Container>
        {[...Array(correctInfo)].map((_, i) => (
          <FoundImg key={`found-${i}`} src={FoundMarker} alt="Found" />
        ))}
        {[...Array(clearCount - correctInfo)].map((_, i) => (
          <FoundImg
            key={`not-found-${i}`}
            src={NotFoundMarker}
            alt="NotFound"
          />
        ))}
      </Container>
      <Container>
        {quizImgUrl.left !== "" && quizImgUrl.right !== "" ? (
          <>
            <ClickBox
              onClick={(e) => handleBoxClick(e, "left")}
              backgroundImage={quizImgUrl.left}
              imgWidth={quizImgSize.width}
              imgHeight={quizImgSize.height}
            >
              {pointsCenter.map((point, index) =>
                point[2] === 1 ? (
                  <CorrectImg
                    key={index}
                    src={CorrectMarker}
                    alt="Correct"
                    left={point[0] - 25}
                    top={point[1] - 25}
                  />
                ) : null
              )}
              {clickedWrong.side === "left" ? (
                <WrongImg
                  src={WrongMarker}
                  alt="Wrong"
                  left={clickedWrong.x - 25}
                  top={clickedWrong.y - 25}
                />
              ) : null}
            </ClickBox>
            <ClickBox
              onClick={(e) => handleBoxClick(e, "right")}
              backgroundImage={quizImgUrl.right}
              imgWidth={quizImgSize.width}
              imgHeight={quizImgSize.height}
            >
              {pointsCenter.map((point, index) =>
                point[2] === 1 ? (
                  <CorrectImg
                    key={index}
                    src={CorrectMarker}
                    alt="Correct"
                    left={point[0] - 25}
                    top={point[1] - 25}
                  />
                ) : null
              )}
              {clickedWrong.side === "right" ? (
                <WrongImg
                  src={WrongMarker}
                  alt="Wrong"
                  left={clickedWrong.x - 25}
                  top={clickedWrong.y - 25}
                />
              ) : null}
            </ClickBox>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  );
};

export default DifferenceGame;

const Container = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClickBox = styled.div`
  width: ${(props) => props.imgWidth}px;
  height: ${(props) => props.imgHeight}px;
  border: 1px solid black;
  background-image: url(${(props) => props.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

const WrongImg = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`;

const CorrectImg = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
`;

const FoundImg = styled.img`
  width: 50px;
  height: 50px;
`;
// const LifeInfoBox = styled(Box)`
//   width: 800px;
//   height: 50px;
//   border: 1px solid black;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   background-color: white;
// `;
