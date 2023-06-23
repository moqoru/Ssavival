import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import PushPinIcon from "@mui/icons-material/PushPin";
import enter from "../../assets/enter.png";

const Game = styled.div`
  position: relative;
  max-width: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
`;

const Input = styled.div`
  margin: 10px;

  input {
    width: 70px;
    height: 70px;
    background-color: transparent;
    border: 5px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    margin: 0px 5px;
    font-size: 1.8rem;
    text-align: center;
    color: black;
    font-family: "neodgm";
    appearance: textfield;
  }
`;

const Blackboard = styled.div`
  position: relative;
  margin: 1% auto;
  width: 600px;
  height: 300px;
  overflow: hidden;
  background-image: url("https://res.cloudinary.com/dovbrtmkv/image/upload/v1494873393/cork_mlmb4o.jpg");
  border: 20px solid #805500;
`;

const PaperList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PaperItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 120px;
  height: 100px;
  list-style-type: none;
  background: #ffff66;
  overflow-wrap: break-word;
  overflow: hidden;
  hyphens: auto;
  margin: 10px;
  padding: 30px 20px;
  float: left;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1);
  border-radius: 60px 60px 120px 120px / 4px 4px 8px 8px;
  font-size: 1rem;
  font-weight: bold;
  font-family: neodgm;

  &:hover {
    width: 20px;
    opacity: 1;
  }

  .tack-icon {
    position: absolute;
    top: 10px;
    left: 50px;
    color: black;
  }
`;

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingImage = styled.img`
  animation: ${blinkAnimation} 0.8s infinite;
`;

export default function RemindGame() {
  const [inputs, setInputs] = useState("");
  const answer = useSelector((state) => state.gameReducer.remindAnswer);
  // const answer = "햄버거";
  const wordList = useSelector((state) => state.gameReducer.remindWordList);
  // console.log(wordList);
  const [currentWords, setCurrentWords] = useState([]);
  const dispatch = useDispatch();

  // 미니게임 클리어 여부
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  // 미니게임 작동 여부
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  useEffect(() => {
    let currentIndex = 0;
    setCurrentWords([]); // Clear the currentWords state initially
    if (wordList.length > 0) {
      // Check if wordList is not empty
      const intervalId = setInterval(() => {
        if (currentIndex < wordList.length) {
          setCurrentWords((currentWords) => [
            ...currentWords,
            wordList[currentIndex],
          ]);
          currentIndex += 1;
        } else {
          clearInterval(intervalId);
        }
      }, 1500);

      return () => clearInterval(intervalId);
    }
  }, [wordList]);

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      const updatedInputs = Array.from(
        event.target.parentNode.querySelectorAll("input")
      )
        .map((input) => input.value)
        .join("");
      setInputs(updatedInputs);

      if (updatedInputs === "") {
        alert("단어를 입력해주세요");
      } else if (answer === updatedInputs) {
        // 게임 클리어 조건에 reducer 요청 구문 삽입
        if (minigameActive) {
          dispatch({ type: "SET_MINIGAME_CLEAR" });
        }
        // Inputs match the answer
        // alert("정답이에용");
      } else {
        // Inputs do not match the answer
        console.log("오답", updatedInputs, answer);
        // alert("틀려써요");
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };
  const renderWordList = () => {
    // console.log(currentWords);
    return currentWords.map((word, index) => (
      <PaperItem key={`${index}_${word}`}>
        <PushPinIcon className="tack-icon" />
        {word}
      </PaperItem>
    ));
  };

  const getInitialConsonant = (char) => {
    const initialValue = char.charCodeAt(0) - 44032; // '가'의 Unicode 값인 44032를 뺍니다.
    const initialIndex = Math.floor(initialValue / 588); // 초성 인덱스를 계산합니다.
    const initials = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    return initials[initialIndex]; // 초성 반환
  };
  return (
    <div>
      <Blackboard>
        <PaperList className="paper">{renderWordList()}</PaperList>;
      </Blackboard>
      <Game>
        <Input>
          {answer.split("").map((char, index) => {
            const transformedChar = getInitialConsonant(char);
            return (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={inputs[`input${index + 1}`]}
                placeholder={transformedChar}
                onChange={(event) => handleInputChange(event, index)}
                onKeyDown={handleInputKeyDown}
              />
            );
          })}
        </Input>
        <BlinkingImage src={enter} alt="" style={{ width: "80px" }} />
      </Game>
    </div>
  );
}
