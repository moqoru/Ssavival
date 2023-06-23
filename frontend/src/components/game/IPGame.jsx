import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

const Comp = styled.div`
  display: flex;
  gap: 10;
`;

const IPData = [
  {
    ipAddress: "427.598.152.654",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
  {
    ipAddress: "783.984.115.452",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
  {
    ipAddress: "201.583.754.493",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
  {
    ipAddress: "823.211.687.902",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
  {
    ipAddress: "857.601.248.462",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
  {
    ipAddress: "054.540.268.318",
    subnetMask: "123.456.789.123",
    gateway: "123.456.789.123",
  },
];

const RandomIP = IPData[Math.floor(Math.random() * IPData.length)];

function IPgame() {
  const [inputs, setInputs] = useState({
    ipAddress: "",
    subnetMask: "",
    gateway: "",
  });

  // 미니게임 클리어 여부
  const minigameClear = useSelector((state) => state.gameReducer.minigameClear);

  // 미니게임 작동 여부
  const minigameActive = useSelector(
    (state) => state.gameReducer.minigameActive
  );

  const dispatch = useDispatch();

  const onChangeHandler = (event, index) => {
    event.preventDefault();
    const { name, value } = event.target;
    let newValue = value.replace(/[^0-9]/g, "");
    newValue = value.replace(/(\d{3})(\d)/, "$1.$2");
    const nextInputs = { ...inputs, [name]: newValue };
    setInputs(nextInputs);
    if (event.target.value.length === event.target.maxLength) {
      const nextIndex = index + 1;
      const nextInput = document.querySelector(`[tabindex="${nextIndex}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const submit = () => {
    if (inputs.ipAddress === RandomIP.ipAddress) {
      if (minigameActive) {
        dispatch({ type: "SET_MINIGAME_CLEAR" });
        console.log("게임결과: " + minigameClear);
      }
    } else {
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.keyCode === 13) {
      const nextIndex = index + 1;
      const nextInput = document.querySelector(`[tabindex="${nextIndex}"]`);
      if (nextInput) {
        nextInput.focus();
        if (nextInput === 6) {
          submit();
        }
      }
    }
  };

  const cancel = () => {
    setInputs({
      ipAddress: "",
      subnetMask: "",
      gateway: "",
      defaultDns: "",
      subDns: "",
    });
  };

  return (
    <Comp>
      {/* 정답 예시 */}
      <Wrapper>
        <Header>
          <HeaderTitle>인터넷 프로토콜 버전(TCP/IPv4) 속성</HeaderTitle>
        </Header>
        <Body>
          <Tab>일반</Tab>
          <Content>
            <ContentTop>
              네트워크가 IP 자동 설정기능을 지원하면 IP 설정이 자동으로
              할당되도록 할 수 있습니다.
            </ContentTop>
            <ContentMain>
              <StyledRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="non-auto"
                name="radio-buttons-group"
              >
                <StyledFormControlLabel
                  value="auto"
                  control={<Radio />}
                  label="자동으로 IP 주소 받기(O)"
                  disabled
                />

                <fieldset>
                  <legend>
                    <StyledFormControlLabel
                      value="non-auto"
                      control={<Radio />}
                      label="다음 IP 주소 사용(S)"
                    />
                  </legend>
                  <InputForm>
                    <div>IP 주소(I):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={RandomIP.ipAddress}
                      name="ipAddress"
                      tabIndex="1"
                      onChange={(e) => onChangeHandler(e, 1)}
                      onKeyDown={(e) => handleKeyPress(e, 1)}
                      readOnly
                      onMouseDown={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </InputForm>
                  <InputForm>
                    <div>서브넷 마스크(U):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={RandomIP.subnetMask}
                      name="subnetMask"
                      tabIndex="2"
                      onChange={(e) => onChangeHandler(e, 2)}
                      onKeyDown={(e) => handleKeyPress(e, 2)}
                      readOnly
                      onMouseDown={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </InputForm>
                  <InputForm>
                    <div>기본 게이트웨이(D):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={RandomIP.gateway}
                      name="gateway"
                      tabIndex="3"
                      onChange={(e) => onChangeHandler(e, 3)}
                      onKeyDown={(e) => handleKeyPress(e, 3)}
                      readOnly
                      onMouseDown={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </InputForm>
                </fieldset>
              </StyledRadioGroup>
            </ContentMain>
            <Footer>
              <Button
                tabIndex="6"
                onClick={submit}
                onKeyPress={(e) => handleKeyPress(e, 6)}
              >
                확인
              </Button>
              <Button onClick={cancel}>취소</Button>
            </Footer>
          </Content>
        </Body>
      </Wrapper>

      {/* 실제 게임 진행 입력란*/}
      <Wrapper style={{ backgroundColor: "#FFDE69" }}>
        <Header>
          <HeaderTitle>인터넷 프로토콜 버전(TCP/IPv4) 속성</HeaderTitle>
        </Header>
        <Body>
          <Tab>일반</Tab>
          <Content>
            <ContentTop>
              네트워크가 IP 자동 설정기능을 지원하면 IP 설정이 자동으로
              할당되도록 할 수 있습니다.
            </ContentTop>
            <ContentMain>
              <StyledRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="non-auto"
                name="radio-buttons-group"
              >
                <StyledFormControlLabel
                  value="auto"
                  control={<Radio />}
                  label="자동으로 IP 주소 받기(O)"
                  disabled
                />

                <fieldset>
                  <legend>
                    <StyledFormControlLabel
                      value="non-auto"
                      control={<Radio />}
                      label="다음 IP 주소 사용(S)"
                    />
                  </legend>
                  <InputForm>
                    <div>IP 주소(I):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={inputs.ipAddress}
                      name="ipAddress"
                      tabIndex="1"
                      onChange={(e) => onChangeHandler(e, 1)}
                      onKeyDown={(e) => handleKeyPress(e, 1)}
                    />
                  </InputForm>
                  <InputForm>
                    <div>서브넷 마스크(U):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={RandomIP.subnetMask}
                      name="subnetMask"
                      tabIndex="2"
                      onChange={(e) => onChangeHandler(e, 2)}
                      onKeyDown={(e) => handleKeyPress(e, 2)}
                    ></Input>
                  </InputForm>
                  <InputForm>
                    <div>기본 게이트웨이(D):</div>
                    <Input
                      type="text"
                      minLength="7"
                      maxLength="15"
                      pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
                      value={RandomIP.gateway}
                      name="gateway"
                      tabIndex="3"
                      onChange={(e) => onChangeHandler(e, 3)}
                      onKeyDown={(e) => handleKeyPress(e, 3)}
                    ></Input>
                  </InputForm>
                </fieldset>
              </StyledRadioGroup>
            </ContentMain>
            <Footer>
              <Button
                tabIndex="6"
                onClick={submit}
                onKeyPress={(e) => handleKeyPress(e, 6)}
              >
                확인
              </Button>
              <Button onClick={cancel}>취소</Button>
            </Footer>
          </Content>
        </Body>
      </Wrapper>
    </Comp>
  );
}

const Input = styled.input`
  margin-left: 10px;
  border: 1px solid;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  font-family: gmarket;
  width: 45%;
  height: auto;
  background-color: #b7b7b7;
  font-size: 0.8rem;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid lightgray;
`;
const HeaderTitle = styled.div`
  margin: 5px auto 5px 8px;
`;
const HeaderRight = styled.div`
  margin: 5px 8px;
`;
const Body = styled.div`
  height: 80%;
  width: 95%;
  margin: 15px auto;
`;
const Tab = styled.div`
  background-color: white;
  border-top: 0.5px solid lightgrey;
  border-left: 0.5px solid lightgrey;
  border-right: 0.5px solid lightgrey;
  padding: 2px 5px 2px 4px;
  width: 20%;
`;
const Content = styled.div`
  background-color: white;
  height: auto;
  font-size: 0.7rem;
`;
const ContentTop = styled.div`
  padding: 10px;
`;
const ContentMain = styled.div`
  padding: 5px;
`;
const StyledRadioGroup = styled(RadioGroup)`
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiTypography-root {
    font-size: 0.7rem;
  }
`;

const InputForm = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1%;
  padding: 1%;
  font-size: 0.7rem;
  div {
    margin-right: auto;
  }
  input {
    width: 120px;
  }
`;
const Footer = styled.div`
  float: right;
  margin-top: 2px;
  margin-right: 5px;
`;
const Button = styled.button`
  margin: 5% 8px;
  padding: 3px 20px;
`;
export default IPgame;
