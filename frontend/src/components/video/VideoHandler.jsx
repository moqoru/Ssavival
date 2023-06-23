import React, { useRef, useState } from "react";

function VideoHandler() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  let intervalID = null;
  let rectX = 0;
  let rectY = canvasRef.current?.height / 2;

  const drawCanvas = () => {
    // canvas 그리기 객체 취득
    const ctx = canvasRef.current?.getContext("2d");

    // 반복 실행: 100ms마다 사각형 그리기
    intervalID = setInterval(() => {
      ctx.fillStyle = "blue";
      ctx.fillRect(rectX, rectY, 10, 10);
      rectX += 20;
    }, 100);
  };

  // stopCanvas메서드: 사각형 반복 그리기 중단
  const stopCanvas = () => {
    clearInterval(intervalID);
  };

  return (
    <div>
      <canvas ref={canvasRef} width="640" height="480" />
      <div>
        <button onClick={drawCanvas}>그리기 시작</button>
        <button onClick={stopCanvas}>그리기 중지</button>
      </div>
      <video
        ref={videoRef}
        controls
        style={{ border: "1px solid black" }}
      ></video>
    </div>
  );
}

export default VideoHandler;
