import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useSpring, animated, Any } from "react-spring";
import { StyledEngineProvider, styled } from "@mui/material/styles";
import pepe_sad from "../../assets/pepe_sad.png";
import pepe_finding from "../../assets/pepe_finding.svg";
// import child_pepe from "child_pepe.png";
// import Badge from "@mui/material/Badge";
// import { useDrag } from "react-use-gesture";
// import Box from "@mui/material/Box";

// import Button from "@mui/material/Button";

// import online from "../../assets/online.png";

// import Draggable from "react-draggable";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { useDrag } from "react-use-gesture";

export default function Puzzling() {
  // 이미지 url
  const imageUrl = "child_pepe.png";

  // 카드 위치 좌표
  // const [position, setPosition] = useState({ x: 0, y: -300 }); // box의 포지션 값
  const cnt = 0;
  const [seats, setSeats] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [images, setImages] = useState([]);
  setImgs(CutImages("child_pepe.png"));
  console.log(
    "============여기야================",
    CutImages("child_pepe.png")
  );

  const CutImages = (src) => {
    // 이미지 저장

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log("onload 함수에 들어왔습니다?");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        // 이미지 채워넣기
        const newImages = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const x = (j * img.width) / 3;
            const y = (i * img.height) / 3;
            const width = img.width / 3;
            const height = img.height / 3;
            const data = ctx.getImageData(x, y, width, height);
            const canvas2 = document.createElement("canvas");
            canvas2.width = width;
            canvas2.height = height;
            const ctx2 = canvas2.getContext("2d");
            ctx2.putImageData(data, 0, 0);
            const image = canvas2.toDataURL();
            newImages.push(image);
          }
        }
        setImages(newImages);
        console.log("for문 중간입니다??=====>", newImages);
      };
    }, [src]);
    console.log("함수 안입니다?===========>", images[0]);
    return images;
    // <div>
    //   {images.map((image, i) => (
    //     <img
    //       key={i}
    //       src={image}
    //       alt={`Image ${i}`}
    //       style={{
    //         width: "11%",
    //         height: "11%",
    //         objectFit: "cover",
    //         overflow: "hidden",
    //       }}
    //     />
    //   ))}
    // </div>
  };

  const selectIndex = (selectingNumber) => {
    let temp = Array.from({ length: 15 }, (v, i) => i);
    console.log(
      "난temp야ㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑ",
      temp
    );
    let randomIndexArray = [];
    while (randomIndexArray.length <= selectingNumber) {
      var movenum = temp.splice(Math.floor(Math.random() * temp.length), 1)[0];
      if (!(movenum in randomIndexArray)) {
        console.log("아직 다 안 차서 얘를 랜덤 배열에 넣어줄 것임 ", movenum);
        randomIndexArray.push(movenum);
      }
      if (randomIndexArray.length === selectingNumber) {
        console.log(
          "다찼다 나가~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        );
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
        content: "pepe",
        imageUrl: pepe_finding,
      },
      { id: "item-2", content: "Item 2", imageUrl: pepe_sad },
      { id: "item-3", content: "Item 3", imageUrl: pepe_finding },
      { id: "item-4", content: "Item 4", imageUrl: pepe_sad },
      { id: "item-5", content: "Item 5", imageUrl: pepe_finding },
      { id: "item-6", content: "Item 6", imageUrl: pepe_sad },
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
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

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
    }
  };

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

  useEffect(() => {
    let temp = new Array(15).fill(false);
    setRandomIndexArray(selectIndex(6));
  }, []);

  useEffect(() => {
    let temp = new Array(15).fill(false);
    var step;
    for (step = 0; step < 6; step++) {
      var idx = randomIndexArray[step];
      temp[idx] = true;
    }
    setSeats([...temp, ...seats]);
  }, [randomIndexArray]);

  return (
    // 옮길 애들 대기 장소
    <DragDropContext onDragEnd={onDragEnd}>
      <CutImages src={imageUrl}></CutImages>
      {/* <div>
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt={`Image ${i}`}
            style={{
              width: "33%",
              height: "33%",
              objectFit: "cover",
              overflow: "hidden",
            }}
          />
        ))}
      </div> */}
      <div
        style={{
          userSelect: "none",
          width: "1200px",
          height: "600px",
          backgroundColor: "white",
          display: "flex",
          // justifyContent: "center",
        }}
      >
        {/* 줄 서 있는 페페들 */}

        <AllArea>
          <LeftSide>
            {/* 1분단 */}
            <First>
              <FirstSet>
                <FirstSetset style={{ marginBottom: "5px" }}>
                  {seats[0] ? (
                    <Droppable droppableId="items2">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={
                            {
                              // backgroundColor: snapshot.isDraggingOver
                              //   ? "purple"
                              //   : "yellow",
                              // backgroundColor: "pink",
                            }
                          }
                        >
                          {state.items2.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}

                  {seats[1] ? (
                    <Droppable droppableId="items3">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellow",
                          }}
                        >
                          {state.items3.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                  // style={{
                                  //   userSelect: "none",
                                  //   padding: 16,
                                  //   margin: "0 0 8px 0",
                                  //   minHeight: "50px",
                                  //   backgroundColor: snapshot.isDragging
                                  //     ? "#263B4A"
                                  //     : "#456C86",
                                  //   color: "white",
                                  //   ...provided.draggableProps.style,
                                  // }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}
                </FirstSetset>

                <FirstSetset style={{ marginTop: "5px" }}>
                  {seats[2] ? (
                    <Droppable droppableId="items4">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items4.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}

                  {seats[3] ? (
                    <Droppable droppableId="items5">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items5.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}
                </FirstSetset>
              </FirstSet>

              <FirstSet>
                <FirstSetset style={{ marginBottom: "5px" }}>
                  {seats[4] ? (
                    <Droppable droppableId="items6">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items6.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}

                  {seats[5] ? (
                    <Droppable droppableId="items7">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items7.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}
                </FirstSetset>

                <FirstSetset style={{ marginTop: "5px" }}>
                  {seats[6] ? (
                    <Droppable droppableId="items8">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items8.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                  // style={{
                                  //   userSelect: "none",
                                  //   padding: 16,
                                  //   margin: "0 0 8px 0",
                                  //   minHeight: "50px",
                                  //   backgroundColor: snapshot.isDragging
                                  //     ? "#263B4A"
                                  //     : "#456C86",
                                  //   color: "white",
                                  //   ...provided.draggableProps.style,
                                  // }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}

                  {seats[7] ? (
                    <Droppable droppableId="items9">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "purple"
                              : "yellpw",
                          }}
                        >
                          {state.items9.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Chair
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                  }}
                                  // style={{
                                  //   userSelect: "none",
                                  //   padding: 16,
                                  //   margin: "0 0 8px 0",
                                  //   minHeight: "50px",
                                  //   backgroundColor: snapshot.isDragging
                                  //     ? "#263B4A"
                                  //     : "#456C86",
                                  //   color: "white",
                                  //   ...provided.draggableProps.style,
                                  // }}
                                >
                                  {item.content}
                                </Chair>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : (
                    <Chair>의자</Chair>
                  )}
                </FirstSetset>
              </FirstSet>
            </First>
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
  width: "1000px",
  justifyContent: "space-around",
  //   paddingRight: "40%",
  // backgroundColor: "blue",
  position: "absolute",
  marginBottom: "100px",
});

const Waiting = styled(`div`)({
  animation: "motion 0.3s linear 0s infinite alternate",
  marginTop: "0",
  marginBottom: "10px",
  position: "relative",
  userSelect: "none",
  // pointerEvents: "none",
  "@keyframes motion": {
    "0%": { marginTop: "0px" },
    "100%": { marginTop: "10px" },
  },
});

const AllArea = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  //   position: "absolute",
  width: "1200px",
  height: "500px",
  //   marginLeft: "60px",
  marginTop: "100px",
  //   backgroundColor: "red",
});

const LeftSide = styled(`div`)({
  display: "flex",
  width: "600px",
  flexDirection: "column",
  //   backgroundColor: "orange",
});

const RightSide = styled(`div`)({
  display: "flex",
  width: "600px",
  //   flex: "0.4",
  flexDirection: "row",
  // backgroundColor: "green",
});

const First = styled(`div`)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  //   backgroundColor: "skyblue",
  flex: "2",
});
const Second = styled(`div`)({
  // backgroundColor: "purple",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: "1",
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
  marginTop: "100px",
  display: "flex",
  flexDirection: "column",

  // justifyContent: "center",
  // alignContent: "center",
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
  // backgroundColor: "skyblue",
  // margin: "3px 0 0 30px",
  // webKitTransform: "rotate(-45deg)",
  // MozTransformOrigin: "rotate(-45deg)",
  // msTransform: "rotate",
  // OTransform: "rotate(-45deg)",
  // transform: "rotate(-45deg)",
  // WebkitTransformOrigin: "0 100%",
  // MozTransformOrigin: "0 100%",
  // msTransformOrigin: "0 100%",
  // transformOrigin: "0 100%",
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
});

const NormalTable = styled(`div`)({
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  // marginTop: "100px",
  width: "250px",
  height: "120px",
});

const MiniTable = styled(`div`)({
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "2px solid black",
  borderRadius: "10%",
  width: "100px",
  height: "80px",
  // marginTop: "100px",
  bottom: "0",
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
