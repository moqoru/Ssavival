import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { StyledEngineProvider, styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  cancel,
} from "react-beautiful-dnd";

export default function Seating() {
  const dispatch = useDispatch();
  // 정답 개수 카운트
  const [count, setCount] = useState(0);
  // 성공 메세지 플래그
  const [showSuccess, setShowSuccess] = useState(false);
  const [seats, setSeats] = useState([]);

  // 미니게임 클리어 여부
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  // 미니게임 작동 여부
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  const [endOrNot, setEndOrNot] = useState(true);
  useEffect(() => {
    if (!minigameActive) {
      setEndOrNot(false);
    }
  });
  useEffect(() => {
    if (count === 3) {
      handleSuccess();
    }
  }, [count]);

  const handleSuccess = () => {
    if (minigameActive) {
      dispatch({ type: "SET_MINIGAME_CLEAR" });
      console.log("게임결과: " + minigameClear);
    }
  };

  // Cancel the drag when the component is unmounted
  // useEffect(() => {
  //   return () => {
  //     const cleanup = () => {
  //       cancel(); // Cancel the drag when the component is unmounted
  //     };

  //     return cleanup;
  //   };
  // }, []);

  const selectIndex = (selectingNumber) => {
    let temp = Array.from({ length: 12 }, (v, i) => i);

    let randomIndexArray = [];
    while (randomIndexArray.length <= selectingNumber) {
      var movenum = temp.splice(Math.floor(Math.random() * temp.length), 1)[0];
      if (!(movenum in randomIndexArray)) {
        console.log("아직 다 안 차서 얘를 랜덤 배열에 넣어줄 것임 ", movenum);
        randomIndexArray.push(movenum);
      }
      if (randomIndexArray.length === selectingNumber) {
        break;
      }
    }
    return randomIndexArray;
  };

  const [randomIndexArray, setRandomIndexArray] = useState([]);
  const [state, setState] = useState({
    items1: [
      {
        id: "item-1",
        content: "",
        imageUrl: "exploding-head.svg",
      },
      { id: "item-2", content: "", imageUrl: "loudly-crying-face.svg" },
      { id: "item-3", content: "", imageUrl: "face-screaming-in-fear.svg" },
      // { id: "item-4", content: "", imageUrl: "pleading-face.svg" },
      // { id: "item-5", content: "", imageUrl: "disguised-face.svg" },
      // { id: "item-6", content: "", imageUrl: "loudly-crying-face.svg" },
    ],
    items2: [],
    items3: [],
    items4: [],
    items5: [],
    items6: [],
    items7: [],
    items8: [],
    items9: [],
    items10: [],
    items11: [],
    items12: [],
    items13: [],
    items14: [],
    items15: [],
    items16: [],

    items17: [],
    items18: [],
    items19: [],
    items20: [],
    items21: [],
    items22: [],
    items23: [],
    items24: [],
  });

  const onDragEnd = (result) => {
    try {
      const { source, destination } = result;
      console.log("onDrag 함수임!!!!!!!!!!!!!!!!!!!!!!!");
      console.log("endORNot은요...", endOrNot);
      if (!endOrNot) {
        console.log("미니게임 종료. 드래그 앤 드롭 중지.");
        return;
      }

      // 드래그앤드롭이 시작된 droppable과 끝난 droppable이 다른 경우
      if (!destination) {
        return;
      }

      // 같은 droppable 내에서 요소를 이동하는 경우
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          state[source.droppableId],
          source.index,
          destination.index
        );
        setState({
          ...state,
          [source.droppableId]: items,
        });
      } else {
        // 다른 droppable로 요소를 이동하는 경우

        const result = move(
          state[source.droppableId],
          state[destination.droppableId],
          source,
          destination
        );
        setState({
          ...state,
          [source.droppableId]: result[source.droppableId],
          [destination.droppableId]: result[destination.droppableId],
        });
        setShowSuccess(true);
        setCount(count + 1);
      }
    } catch (error) {
      console.log("에러ㅏㅇ야아아앙");
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
    try {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      const result = {};
      console.log("move함수임!!!!!!!!!!!!!!!!!!!!!!!");
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;

      return result;
    } catch (e) {
      console.log("에러야아앙");
      return;
    }
  };

  useEffect(() => {
    let temp = new Array(12).fill(false);
    setRandomIndexArray(selectIndex(6));
  }, []);

  useEffect(() => {
    let temp = new Array(12).fill(false);
    var step;
    // temp[0] = true;
    for (step = 0; step < 6; step++) {
      var idx = randomIndexArray[step];
      temp[idx] = true;
    }
    setSeats([...temp, ...seats]);
  }, [randomIndexArray]);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const onDragStart = () => {
    // minigame이 활성화 중이면 드래그 가능
    setIsDragDisabled(!minigameActive);
  };

  // 드래그 중일때 미니게임 끝나는 경우 드래그 중지

  const handleDragUpdate = (update) => {
    console.log("드래그 업데이트 핸들 함수");
    console.log("핸들드레그업데이트 함수의 endOrNot은요...", endOrNot);
    const { destination, draggableId } = update;
    if (destination === null && !endOrNot) {
      // 요소를 드래그하다가 드롭하지 않은 경우

      // endOrNot 상태가 false이고, 특정 draggableId가 드래그 중인 경우
      setEndOrNot(true); // endOrNot 상태를 변경
      onDragEnd(); // 드래그 중지

      return;
    }
  };

  return (
    <DragDropContext onDragUpdate={handleDragUpdate} onDragEnd={onDragEnd}>
      <div
        style={{
          userSelect: "none",
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          display: "flex",
          backgroundImage: `url(${"floor.png"})`,
          // justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Droppable droppableId={`items${1}`}>
          {(provided, snapshot) => (
            <WaitingLine
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                // backgroundColor: snapshot.isDraggingOver ? "gray" : "yellpw",
                padding: 4,
                // width: "30%",
                // height: "10%",
              }}
            >
              {state.items1.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    const imageStyle = {
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      userSelect: "none",
                      padding: 16,
                      margin: "0 0 8px 0",
                      minHeight: "50px",
                      height: "50px",
                      ...provided.draggableProps.style,
                    };
                    return (
                      <div style={{ width: "100px", height: "auto" }}>
                        <Bubble>
                          <img
                            src={"bubble.svg"}
                            style={{ position: "absolute", width: "60px" }}
                          />
                          <div
                            style={{
                              position: "relative",
                              width: "60px",
                              marginTop: "30%",
                              fontSize: "10pt",
                              fontFamily: "neodgm",
                              // backgroundColor: "red",
                            }}
                          >
                            배고파~~
                          </div>
                        </Bubble>
                        <Waiting
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={imageStyle}
                        >
                          {item.content}
                        </Waiting>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </WaitingLine>
          )}
        </Droppable>

        <AllArea>
          <LeftSide>
            {/* 1분단 */}
            <First>
              <FirstSet>
                <FirstSetset style={{ marginBottom: "5px" }}>
                  {seats.slice(0, 2).map((seat, index) =>
                    seat ? (
                      <Droppable
                        key={`droppable-${index + 2}`}
                        droppableId={`items${index + 2}`}
                        isDropDisabled={state[`items${index + 2}`].length > 0}
                      >
                        {(provided, snapshot) => (
                          <Empty
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {state[`items${index + 2}`].map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index + 2}
                                isDragDisabled={!minigameActive}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      ...provided.draggableProps.style,
                                      backgroundSize: "contain",
                                      backgroundRepeat: "no-repeat",
                                      width: "50px",
                                      height: "50px",
                                      backgroundImage: `url(${"drooling-face.svg"})`,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Empty>
                        )}
                      </Droppable>
                    ) : (
                      <Chair>
                        <EmptyPerson>
                          <img
                            src="drooling-face.svg"
                            style={{ width: "50px" }}
                          />{" "}
                        </EmptyPerson>
                      </Chair>
                    )
                  )}
                </FirstSetset>

                <NormalTable></NormalTable>
                <FirstSetset style={{ marginTop: "5px" }}>
                  {seats.slice(2, 4).map((seat, index) =>
                    seat ? (
                      <Droppable
                        key={`droppable-${index + 4}`}
                        droppableId={`items${index + 4}`}
                        isDropDisabled={state[`items${index + 4}`].length > 0}
                      >
                        {(provided, snapshot) => (
                          <Empty
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {state[`items${index + 4}`].map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index + 4}
                                isDragDisabled={!minigameActive}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      ...provided.draggableProps.style,
                                      backgroundSize: "contain",
                                      backgroundRepeat: "no-repeat",
                                      width: "50px",
                                      height: "50px",
                                      backgroundImage: `url(${"drooling-face.svg"})`,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Empty>
                        )}
                      </Droppable>
                    ) : (
                      <Chair>
                        <EmptyPerson>
                          <img
                            src="drooling-face.svg"
                            style={{ width: "50px" }}
                          />{" "}
                        </EmptyPerson>
                      </Chair>
                    )
                  )}
                </FirstSetset>
              </FirstSet>

              <FirstSet>
                <FirstSetset style={{ marginBottom: "5px" }}>
                  {seats.slice(4, 6).map((seat, index) =>
                    seat ? (
                      <Droppable
                        key={`droppable-${index + 6}`}
                        droppableId={`items${index + 6}`}
                        isDropDisabled={state[`items${index + 6}`].length > 0}
                      >
                        {(provided, snapshot) => (
                          <Empty
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {state[`items${index + 6}`].map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                isDragDisabled={!minigameActive}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      ...provided.draggableProps.style,
                                      backgroundSize: "contain",
                                      backgroundRepeat: "no-repeat",
                                      width: "50px",
                                      height: "50px",
                                      backgroundImage: `url(${"drooling-face.svg"})`,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Empty>
                        )}
                      </Droppable>
                    ) : (
                      <Chair>
                        <EmptyPerson>
                          <img
                            src="drooling-face.svg"
                            style={{ width: "50px" }}
                          />{" "}
                        </EmptyPerson>
                      </Chair>
                    )
                  )}
                </FirstSetset>
                <NormalTable></NormalTable>
                <FirstSetset style={{ marginTop: "5px" }}>
                  {seats.slice(6, 8).map((seat, index) =>
                    seat ? (
                      <Droppable
                        key={`droppable-${index + 8}`}
                        droppableId={`items${index + 8}`}
                        isDropDisabled={state[`items${index + 8}`].length > 0}
                      >
                        {(provided, snapshot) => (
                          <Empty
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {state[`items${index + 8}`].map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                isDragDisabled={!minigameActive}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    style={{
                                      ...provided.draggableProps.style,
                                      backgroundSize: "contain",
                                      backgroundRepeat: "no-repeat",
                                      width: "50px",
                                      height: "50px",
                                      backgroundImage: `url(${"drooling-face.svg"})`,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Empty>
                        )}
                      </Droppable>
                    ) : (
                      <Chair>
                        <EmptyPerson>
                          <img
                            src="drooling-face.svg"
                            style={{ width: "50px" }}
                          />{" "}
                        </EmptyPerson>
                      </Chair>
                    )
                  )}
                </FirstSetset>
              </FirstSet>
            </First>
            {/*  */}
            <div>{showSuccess && <Success>성공!!! {count}/3 </Success>}</div>
            {/* 2분단 */}
            <Second>
              <SecondSet>
                {seats[8] ? (
                  <Droppable droppableId="items10">
                    {(provided, snapshot) => (
                      <Empty
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {state.items10.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={!minigameActive}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "50px",
                                  height: "50px",

                                  backgroundImage: `url(${"drooling-face.svg"})`,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Empty>
                    )}
                  </Droppable>
                ) : (
                  <Chair>
                    <EmptyPerson>
                      <img src="drooling-face.svg" style={{ width: "50px" }} />{" "}
                    </EmptyPerson>
                  </Chair>
                )}
                <MiniTable></MiniTable>
              </SecondSet>

              <SecondSet>
                {seats[9] ? (
                  <Droppable droppableId="items11">
                    {(provided, snapshot) => (
                      <Empty
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {state.items11.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={minigameActive}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "50px",
                                  height: "50px",
                                  backgroundImage: `url(${"drooling-face.svg"})`,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Empty>
                    )}
                  </Droppable>
                ) : (
                  <Chair>
                    <EmptyPerson>
                      <img src="drooling-face.svg" style={{ width: "50px" }} />{" "}
                    </EmptyPerson>
                  </Chair>
                )}
                <MiniTable></MiniTable>
              </SecondSet>

              <SecondSet>
                {seats[10] ? (
                  <Droppable droppableId="items12">
                    {(provided, snapshot) => (
                      <Empty
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {state.items12.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={!minigameActive}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "50px",
                                  height: "50px",
                                  backgroundImage: `url(${"drooling-face.svg"})`,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Empty>
                    )}
                  </Droppable>
                ) : (
                  <Chair>
                    <EmptyPerson>
                      <img src="drooling-face.svg" style={{ width: "50px" }} />{" "}
                    </EmptyPerson>
                  </Chair>
                )}
                <MiniTable></MiniTable>
              </SecondSet>

              <SecondSet>
                {seats[11] ? (
                  <Droppable droppableId="items13">
                    {(provided, snapshot) => (
                      <Empty
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {state.items13.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                            isDragDisabled={!minigameActive}
                          >
                            {(provided, snapshot) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  ...provided.draggableProps.style,
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  width: "50px",
                                  height: "50px",
                                  backgroundImage: `url(${"drooling-face.svg"})`,
                                }}
                              >
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Empty>
                    )}
                  </Droppable>
                ) : (
                  <Chair>
                    <EmptyPerson>
                      <img src="drooling-face.svg" style={{ width: "50px" }} />{" "}
                    </EmptyPerson>
                  </Chair>
                )}
                <MiniTable></MiniTable>
              </SecondSet>
            </Second>
          </LeftSide>
        </AllArea>
      </div>
    </DragDropContext>
  );
}

const TestDiv = styled(`div`)({
  position: "relative",
  fontSize: "5rem",
  animation: "slide 3s ease-in-out",
  "@keyframes slide": {
    from: {
      left: "-650px",
    },
    to: {
      left: "500px",
    },
  },
});

const WaitingLine = styled(`div`)({
  marginBottom: "150px",
  //   animation: "none",
  display: "flex",
  flexDirection: "row",
  width: "500px",
  height: "10%",
  justifyContent: "space-around",
  //   paddingRight: "40%",
  // backgroundColor: "blue",
  position: "absolute",
  marginBottom: "100px",
  marginLeft: "25px",
});

const Waiting = styled(`div`)({
  marginTop: "0",
  marginBottom: "10px",
  position: "relative",
  userSelect: "none",
  width: "40px",
  height: "40px",
  // marginRight: "300px",
  // backgroundColor: "red",
  // pointerEvents: "none",
  animation: "motion 0.3s linear 0s infinite alternate",
  "@keyframes motion": {
    "0%": { marginTop: "0px" },
    "100%": { marginTop: "10px" },
  },
});

const AllArea = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  //   position: "absolute",
  width: "500px",
  height: "400px",
  //   marginLeft: "60px",
  marginTop: "100px",
  //   backgroundColor: "red",
});

const LeftSide = styled(`div`)({
  display: "flex",
  width: "500px",
  flexDirection: "column",
  //   backgroundColor: "orange",
});

const RightSide = styled(`div`)({
  display: "flex",
  width: "500px",
  //   flex: "0.4",
  flexDirection: "row",
  // backgroundColor: "green",
});

const First = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  // backgroundColor: "skyblue",
  flex: "2",
  // width: "80%",
});
const Second = styled(`div`)({
  // backgroundColor: "purple",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: "1",
  // marginTop: "2%",
  // backgroundColor: "red",
  marginBottom: "7%",
});
const Third = styled(`div`)({
  // backgroundColor: "pink",
  //   width: "50%",
  flex: "1.4",
});
const Fourth = styled(`div`)({
  // backgroundColor: "brown",
  display: "flex",
  flexDirection: "row",
  // MarginRight: "0px",
  //   width: "50%",
  flex: "1",
  marginBottom: "7%",
});

const FirstSet = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
});

const FirstSetset = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",

  // alignContent: "center",
});

const SecondSet = styled(`div`)({
  // backgroundColor: "yellow",
  marginTop: "10%",
  display: "flex",
  flexDirection: "column",

  justifyContent: "center",
  alignContent: "center",
});

const ThirdSet = styled(`div`)({
  // backgroundColor: "black",
  // width: "80px",
  height: "40%",
  marginTop: "10%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
});

const ThirdSetSet = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  // backgroundColor: "brown",
});

const FourthSet = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  marginLeft: "60px",
});

const Chair = styled(`div`)({
  width: "50px",
  height: "30px",
  border: "2px solid black",
  borderRadius: "30%",
  backgroundColor: "gray",
  // backgroundImage: `url(${"flushed-face.svg"})`,
});

const NormalTable = styled(`div`)({
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  // marginTop: "100px",
  width: "180px",
  height: "80px",
});

const MiniTable = styled(`div`)({
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  width: "80px",
  height: "50px",
  // marginTop: "100px",
  // bottom: "10",
  marginBottom: "60px",
});

const DiaTable = styled(`div`)({
  width: "90px",
  height: "90px",
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  // margin: "3px 0 0 30px",
  webKitTransform: "rotate(-45deg)",
  MozTransformOrigin: "rotate(-45deg)",
  msTransform: "rotate",
  OTransform: "rotate(-45deg)",
  transform: "rotate(-45deg)",
  WebkitTransformOrigin: "0 100%",
  MozTransformOrigin: "0 100%",
  msTransformOrigin: "0 100%",
  transformOrigin: "0 100%",
  marginLeft: "160px",
});

const LongTable = styled(`div`)({
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  width: "85px",
  height: "500px",
  // right: "0",
  // marginLeft: "auto",
  marginRight: "68px",
  //   marginTop: "100px",
  bottom: "0",
});

const Empty = styled(`div`)({
  width: "50px",
  height: "30px",
  backgroundColor: "gray",
  border: "2px solid black",
  borderRadius: "20%",

  animation: "light 1s ease-in-out infinite",
  "@keyframes light": {
    "0%": { boxShadow: "0 0 10px 0px rgba(255, 0, 0, 0.5)" },
    "50%": { boxShadow: "0 0 20px 5px rgba(255, 0, 0, 0.2)" },
    "100%": { boxShadow: "0 0 10px 0px rgba(255, 0, 0, 0.5)" },
  },
});

const EmptyPerson = styled(`div`)({
  width: "60px",
  height: "60px",
  animation: "motion 0.3s linear 0s infinite alternate",
  "@keyframes motion": {
    "0%": { marginTop: "0px" },
    "100%": { marginTop: "10px" },
  },
});

const Success = styled(`div`)({
  width: "600px",
  position: "absolute",
  fontSize: "40pt",
  color: "black",
  zIndex: "20",
  fontFamily: "neodgm",
  backgroundColor: "skyblue",
  top: "40%",
  // bottom: "15p%",
  paddingLeft: "10%",
  // fontSize: 1.7rem;
  // color: black;
});

const Bubble = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "5%",
  height: "auto",
  marginLeft: "-35%",
  animation: "motion 0.3s linear 0s infinite alternate",
  "@keyframes motion": {
    "0%": { marginTop: "0px" },
    "100%": { marginTop: "10px" },
  },
});
