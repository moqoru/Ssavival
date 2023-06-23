import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import CampusChart from "./CampusChart";
import Ranking from "./Ranking";
import { useDispatch } from "react-redux";
import { MainAction } from "../../redux/actions/MainAction";

const Comp3 = styled.div`
  // font-family: "neodgm";
  width: "100%";
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 10px;
  font-family: "neodgm";
`;

export default function MainComp3() {
  const dispatch = useDispatch();

  // 캠퍼스별 평균 점수 가져오기
  useEffect(() => {
    dispatch(MainAction.getCampusAvg());
  }, []);

  return (
    <Comp3>
      <Box
        sx={{
          width: "100%",
          height: "45vh",
          backgroundColor: "rgba(255,255,255,0.4)",
          border: "1px solid #BEBEBE",
          borderRadius: 12,
        }}
      >
        <Title>금주의 캠퍼스 랭킹</Title>
        <ChartWrapper>
          <div style={{ width: "45%", height: "80%" }}>
            <CampusChart />
          </div>
          <div style={{ width: "40%", height: "80%" }}>
            <Ranking />
          </div>
        </ChartWrapper>
      </Box>
    </Comp3>
  );
}
