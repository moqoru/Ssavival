import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  background-color: #e0e0de;
  border-radius: 10px;
`;

const Bar = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: #00b3ff;
  border-radius: 10px;
`;

const Pin = styled.div`
  width: 10px;
  height: 10px;
  background-color: #00b3ff;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  left: ${(props) => props.left}%;
`;

const NumericValue = styled.div`
  position: absolute;
  top: -35px;
  left: ${(props) => props.left}%;
  font-size: 18px;
  color: #000000;
  font-weight: bold;
`;

const ProgressBar = ({ value }) => {
  const barWidth = Math.min(value, 100);
  return (
    <Wrapper>
      <Bar width={barWidth} />
      <Pin left={barWidth} />
      <NumericValue left={barWidth}>{value}</NumericValue>
    </Wrapper>
  );
};

export default ProgressBar;
