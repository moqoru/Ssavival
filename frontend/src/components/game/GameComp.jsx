import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TimerBomb from "./TimerBomb";

export default function GameComp(props) {
  const { children } = props;
  const [recorder, setRecorder] = React.useState(null);

  const startRecording = () => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    const element = document.getElementById("capture-area");

    const stream = canvas.captureStream();
    const chunks = [];

    const newRecorder = new MediaRecorder(stream);
    newRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
      console.log(chunks.length);
    };
    newRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recorded.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    };

    setRecorder(newRecorder);

    if (
      element &&
      (element instanceof HTMLCanvasElement ||
        element instanceof HTMLImageElement ||
        element instanceof HTMLVideoElement)
    ) {
      // 유효한 이미지 객체인지 확인
      ctx.drawImage(element, 0, 0, canvas.width, canvas.height);
    }
    newRecorder.start();
  };

  // 녹화 종료
  const stopRecording = () => {
    recorder.stop();
  };

  const hasBg = Boolean(children.props.bg);

  // const [timeCheck, setTimeCheck] = useState(false);

  // const canvasRef = useRef(null);
  // const [recorder, setRecorder] = useState(null);
  // const [recording, setRecording] = useState(false);
  // const [recordedChunks, setRecordedChunks] = useState([]);

  // const startRecording = () => {
  //   setRecording(true);

  //   // 캔버스 요소 취득
  //   const canvas = canvasRef.current;
  //   console.log("Canva", canvas);

  //   // 녹화 스트림 생성
  //   const stream = canvas.captureStream(30); // 30fps

  //   // MediaRecorder 생성
  //   const mediaRecorder = new MediaRecorder(stream);

  //   // 녹화 중 데이터 수신 이벤트 처리
  //   mediaRecorder.ondataavailable = (e) => {
  //     console.log("ONDATAAVAIL");
  //     console.log("DATA", e);
  //     setRecordedChunks((prevChunks) => {
  //       const newChunks = [...prevChunks, e.data];
  //       return newChunks;
  //     });
  //   };

  //   // 녹화 중지 이벤트 처리
  //   mediaRecorder.onstop = () => {
  //     console.log("ONSTOP");
  //     setRecording(false);
  //     console.log(recordedChunks.length);

  //     // 녹화 결과 Blob 생성
  //     if (recordedChunks.length > 0) {
  //       const blob = new Blob(recordedChunks, { type: "video/webm" });

  //       // Blob URL 생성 및 비디오 요소에 적용
  //       const videoUrl = URL.createObjectURL(blob);
  //       const video = document.querySelector("#recorded-video");
  //       video.src = videoUrl;
  //       setRecordedChunks([]);
  //     }
  //   };

  //   // 녹화 시작
  //   mediaRecorder.start();
  //   setRecorder(mediaRecorder);
  // };

  // const stopRecording = () => {
  //   console.log("stop");
  //   recorder.stop();
  // };

  // useEffect(() => {
  //   console.log("INININ");
  //   startRecording();
  // }, []);

  return (
    <Box
      id="capture-area" // 녹화할 요소의 id를 부여합니다.
      sx={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "flex-start",
        // flexWrap: "wrap",
        border: "none",
        borderRadius: 10,
        boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: 3,
        maxWidth: "40%",
        width: "100%",
        height: "72vh",
        overflow: "hidden",
        backgroundImage: hasBg ? `url(${children.props.bg})` : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <TimerBomb timeLimit={10} />
      {/* <canvas ref={canvasRef} style={{ backgroundColor: "green" }} /> */}
      {children}
      {/* <button onClick={startRecording}>녹화 시작</button>
      <button onClick={stopRecording}>녹화 종료</button> */}
    </Box>
  );
}
