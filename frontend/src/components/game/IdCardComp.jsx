import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

// import Box from "@mui/material/Box";

// import Button from "@mui/material/Button";
import reader from "../../assets/reader.png";
import idCard from "../../assets/IDcard.svg";
// import idCard2 from
import back from "../../assets/card_back.png";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { useDrag } from "react-use-gesture";

export default function IdCard() {
  const dispatch = useDispatch();
  // 정답 개수 카운트
  const [count, setCount] = useState(0);
  // 성공 메세지 플래그
  const [showSuccess, setShowSuccess] = useState(false);

  // 미니게임 클리어 여부
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  // 미니게임 작동 여부
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );
  useEffect(() => {
    if (count === 4) {
      handleSuccess();
    }
  }, [count]);

  const handleSuccess = () => {
    if (minigameActive) {
      dispatch({ type: "SET_MINIGAME_CLEAR" });
      console.log("게임결과: " + minigameClear);
    }
  };
  const [state, setState] = useState({
    items1: [
      { id: "item1", imageUrl: "card1.png" },
      { id: "item2", imageUrl: "card2.png" },
      { id: "item3", imageUrl: "card3.png" },
      { id: "item4", imageUrl: "card4.png" },
      // { id: "item5", imageUrl: idCard },
      // { id: "item6", imageUrl: "idCard2.svg" },
    ],
    items2: [],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );

      setState({ ...state, [source.droppableId]: items });
    } else {
      const result = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      );

      // Remove the dropped item from items1
      // const items1 = state.items1.filter(
      //   (item) => item.id !== result.draggableId
      // );
      setState({
        // items1: items1,
        // items2: result[destination.droppableId],
        ...state,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
        items2: [],
      });
      setShowSuccess(true);
      setCount(count + 1);
      setIsScoring(true);
    }
  };
  // 성공 표시 함수
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
      }, 500);
    }
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  // 태그 성공했을 시 gif
  // 채점 효과(with scoring.gif)
  const [isScoring, setIsScoring] = useState(false);
  if (isScoring) {
    setTimeout(() => {
      setIsScoring(false);
    }, 800);
  }

  // 이미지 이동 실험
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPos((pos) => pos + 10);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          userSelect: "none",
          width: "500px",
          height: "400px",
          // width: "100%",
          // hegiht: "auto",
          backgroundColor: "white",
          display: "flex",
          position: "relative",
          backgroundImage: `url(${back})`,
          margin: "0 auto",
        }}
      >
        <Bubble>
          <img
            src={"bubble.svg"}
            style={{ position: "absolute", width: "20%" }}
          />
          <div
            style={{
              position: "relative",
              // width: "200px",
              marginTop: "15%",
              // marginLeft: "5%",
              fontFamily: "neodgm",
              fontSize: "9pt",
              // backgroundColor: "pink",
            }}
          >
            드래그 해서<br></br>
            모든 카드를<br></br>
            태그해주세요~~
          </div>
        </Bubble>
        <Droppable droppableId="items1">
          {(provided) => (
            <Cards
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                // width: "90%",
                // height: "100%",
                transform: `translateX(${pos}px)`,
              }}
            >
              {state.items1.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  // shouldAnimateDraggable={true}
                >
                  {(provided, snapshot) => {
                    const { style, ...rest } = provided.draggableProps;
                    const imageStyle = {
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      userSelect: "none",
                      margin: "0 0 8px 20px",

                      ...provided.draggableProps.style,

                      // transform: `${provided.draggableProps.style.transform} translateX(${pos}px)`,
                    };
                    return (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={imageStyle}
                      >
                        {/* <img src={item.imageUrl} alt="item" /> */}
                      </Card>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </Cards>
          )}
        </Droppable>
        <div>{showSuccess && <Success>성공!!! {count}/4 </Success>}</div>
        {/* {isScoring && (
          <img
            src={scoring}
            alt="scoring.gif"
            style={{ position: "absolute", width: "50%", height: "50%" }}
          />
        )} */}
        <Droppable droppableId="items2">
          {(provided, snapshot) => (
            <Reader
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // backgroundColor: snapshot.isDraggingOver
                //   ? "lightblue"
                //   : "lightgrey",

                // padding: 4,
                backgroundImage: `url(${reader})`,
              }}
            >
              {state.items2.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        width: "330px",
                        height: "100px",
                        backgroundImage: `url(${idCard})`,
                      }}
                    >
                      {/* <img src={item.imageUrl} alt="item" /> */}
                    </div>
                  )}
                </Draggable>
              ))}
            </Reader>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

const Cards = styled(`div`)({
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  width: "500px",
  height: "100px",
  // top: 0,
  marginTop: "55%",
  // justifyContent: "space-around",
  zIndex: "10",
  // marginRight: "500px",
  right: 250,
  // backgroundColor: "red",
});

const Card = styled(`div`)({
  position: "relative",
  userSelect: "none",
  width: "90px",
  height: "80px",
  marginRight: "30%",
});

const Reader = styled(`div`)({
  position: "relative",
  // display: "flex",
  // flexDirection: "row",
  width: "300px",
  marginTop: "15%",
  marginLeft: "20%",
  // top: 0,
  // marginTop: "30%",
  // justifyContent: "space-around",
});
// 성공 팝업
const Success = styled(`div`)({
  width: "500px",
  position: "absolute",
  fontSize: "40pt",
  color: "red",
  zIndex: "20",
  fontFamily: "neodgm",
  marginTop: "30%",
  right: 0,
  paddingLeft: "8%",
});
const Bubble = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  // backgroundColor: "red",
  width: "200px",
  height: "100px",
  marginTop: "30px",
  marginLeft: "35%",
  animation: "motion 0.3s linear 0s infinite alternate",
  "@keyframes motion": {
    "0%": { marginTop: "10px" },
    "100%": { marginTop: "30px" },
  },
});
