import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TimerBomb from "./TimerBomb";

/* 게임 컴포넌트를 받는 상위 페이지 */

const Comp = styled.div`
  display: flex;
  justify-content: center;
  gap: 10;
`;
export default function GameComp(props) {
  const { children } = props;

  // 게임 컴포넌트의 개별 배경이 있는 경우
  const hasBg = Boolean(children.props.bg);

  return (
    <Comp>
      <Box
        sx={{
          // display: "flex",
          // alignItems: "flex-start",
          // flexWrap: "wrap",
          border: "none", // 테두리 없애기
          borderRadius: 10,
          boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
          backgroundColor: "rgba(255, 255, 255, 0.7)", // 배경색 투명하게 만들기
          padding: 3,
          maxWidth: "40%", // 최대 너비 값 설정
          width: "700px",
          height: "72vh",
          overflow: "hidden",
          marginRight: 10, //
          // 게임 컴포넌트의 개별 배경이 있는 경우(ex_모니터)
          backgroundImage: hasBg ? `url(${children.props.bg})` : undefined,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* 타이머 시간을 초로 집어넣으면 됩니다. */}
        <TimerBomb timeLimit={10} />
        {children}
      </Box>

      <Box
        sx={{
          // display: "flex",
          // alignItems: "flex-start",

          // flexWrap: "wrap",
          border: "none", // 테두리 없애기
          borderRadius: 10,
          boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.2)", // 그림자 추가하기
          backgroundColor: "rgba(255, 255, 255, 0.7)", // 배경색 투명하게 만들기
          padding: 3,
          maxWidth: "40%", // 최대 너비 값 설정
          width: "700px",
          height: "72vh",
          overflow: "hidden",
          // 게임 컴포넌트의 개별 배경이 있는 경우(ex_모니터)
          backgroundImage: hasBg ? `url(${children.props.bg})` : undefined,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* 타이머 시간을 초로 집어넣으면 됩니다. */}
        <TimerBomb timeLimit={10} />
        {children}
      </Box>
    </Comp>
  );
}
