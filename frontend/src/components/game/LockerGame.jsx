import styled from "styled-components";
import { Box } from "@mui/material";
import paperPassword from "../../assets/game_locker/paper_password.png";
import lockerBook from "../../assets/game_locker/locker_book.png";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function generateRandomPassword() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const paddedNumber = randomNumber.toString().padStart(4, "0");
  return paddedNumber;
}

const LockerGame = () => {
  const [enteredValue, setEnteredValue] = useState("");
  // 추후 비밀번호를 props로 받아오게 만들 수도 있음
  const [correctPassword, setCorrectPassword] = useState("");
  const [shuffledKeypad, setShuffledKeypad] = useState([]);

  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setCorrectPassword(generateRandomPassword());
    const newShuffledKeypad = Array.from({ length: 10 }, (_, i) =>
      i.toString()
    );
    setShuffledKeypad(shuffle(newShuffledKeypad));
  }, []);

  // Knuth Shuffle 알고리즘으로 정해진 길이의 배열의 순서를 섞음, O(n)
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleNumButtonClick = (e) => {
    const { innerText } = e.target;
    setEnteredValue((prev) => {
      if (prev.length >= 4) {
        return innerText;
      }
      if (prev.length >= 3 && prev + innerText === correctPassword) {
        if (minigameActive) {
          dispatch({ type: "SET_MINIGAME_CLEAR" });
        }
      }
      return prev + innerText;
    });
  };

  return (
    <>
      <LockerDoorContainer>
        <LockerDoor>
          {minigameClear ? (
            <LockerInside>
              <BookInside src={lockerBook} alt="LockerBook" />
            </LockerInside>
          ) : (
            <>
              <EnteredPassword>{enteredValue}</EnteredPassword>
              <KeyPad>
                <NumButtonContainer>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[1]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[2]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[3]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[4]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[5]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[6]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[7]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[8]}
                  </NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[9]}
                  </NumButton>
                  <NumButton>*</NumButton>
                  <NumButton onClick={handleNumButtonClick}>
                    {shuffledKeypad[0]}
                  </NumButton>
                  <NumButton>#</NumButton>
                </NumButtonContainer>
                <LockerLamp
                  isWrongPassword={!minigameClear && enteredValue.length >= 4}
                />
                <OuterCircle />
                <InnerCircle />
              </KeyPad>
              <PasswordInfo src={paperPassword} alt="PasswordPaper" />
              <RequiredPassword>{correctPassword}</RequiredPassword>
            </>
          )}
        </LockerDoor>
      </LockerDoorContainer>
    </>
  );
};

export default LockerGame;

const LockerDoorContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LockerDoor = styled.div`
  width: 500px;
  height: 400px;
  background-color: #ffffff;
  border: 2px solid #000000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LockerInside = styled.div`
  width: 450px;
  height: 350px;
  background-color: #cccccc;
  border: 1px solid #000000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BookInside = styled.img`
  width: 350px;
  height: 350px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NumButtonContainer = styled.div`
  position: absolute;
  top: 12%;
  display: flex;
  flex-wrap: wrap;
  width: 93px;
`;

const EnteredPassword = styled(Box)`
  position: absolute;
  top: 18%;
  left: 15%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 30px;
  font-weight: bold;
  font-size: 2rem;
`;

const KeyPad = styled.div`
  position: absolute;
  top: 55%;
  left: 16%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 240px;
  background-color: black;
  border-left: 5px solid gray;
  border-right: 5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumButton = styled(Box)`
  width: 25px;
  height: 18px;
  border: 1px solid #555555;
  background-color: #cccccc;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin: 2px;

  &:active {
    background-color: #87ceeb;
  }
`;

const LockerLamp = styled.div`
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 7px solid transparent;
  border-top-color: ${(props) => (props.isWrongPassword ? "red" : "skyblue")};
  border-radius: 50%;
  overflow: hidden;
`;

const OuterCircle = styled.div`
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 5px solid gray;
  border-radius: 50%;
`;

const InnerCircle = styled.div`
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: gray;
`;

const PasswordInfo = styled.img`
  position: absolute;
  top: 55%;
  left: 65%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 180px;
`;

const RequiredPassword = styled(Box)`
  position: absolute;
  top: 55%;
  left: 62%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 30px;
  font-weight: bold;
  font-size: 2.5rem;
`;
