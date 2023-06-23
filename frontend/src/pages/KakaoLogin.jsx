import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { REST_API_KEY, REDIRECT_URI } from "../components/KakaoLoginData";
import { kakaoUrl, baseUrl } from "../redux/actions/url";
import ssafy from "../assets/ssafy.png";
import background from "../assets/background.png";
import ssavival from "../assets/ssavival.png";

const Pages = styled.div`
  position: relative;
  font-family: neodgm;

  background-size: cover;
  background-image: url(${background});
  height: 100vh;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  margin-top: 5px;
  padding: 12px;
  border: 1px solid #3396f4;
  z-index: 3;
  width: 350px;
`;

const Input = styled.input`
  width: 300px;
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: #fff;
  font-family: "neodgm";
  color: black;
  border: none;
  outline: none;
  color: black;
  font-size: 14px;
`;

const DropBox = styled.select`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  padding: 12px;
  border: 1px solid #3396f4;
  z-index: 3;
  width: 350px;
  font-family: "neodgm";

  option {
    font-family: "neodgm";
  }
`;

const Text = styled.p`
  font-size: 14px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px 10px;
`;

export default function KakaoLogin() {
  // const PARAMS = new URL(document.location).searchParams;
  // const KAKAO_CODE = PARAMS.get('code');
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  const REQUEST_ADDRESS = "";
  //   const value = "";
  const [selectedOption, setSelectedOption] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [kakaoNickname, setKakaoNicknamemail] = useState("");
  const [userId, setUserId] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };
  const [user, setUser] = useState({});
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    console.log(nickname);
  };
  useEffect(() => {
    getKakaoToken();
    console.log(1);
  }, []);

  useEffect(() => {
    registCheck();

    console.log(2);
    localStorage.setItem("email", email);
  }, [email]);

  // useEffect(() => {
  // }, [userId]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
    if (userId) window.location.href = `${kakaoUrl}/main`;
  }, [userId]);
  const getUserId = async () => {
    await axios
      .get(`${baseUrl}/main/find/${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          setUserId(res.data.user.userId);
        }
        // localStorage.setItem("userId", res.data.user.userId);
      })
      .catch((error) => console.log(error));
  };
  // kakao에서 access-token 받기
  const getKakaoToken = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_url=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(data.id_token) undefined(권한 비지니스로 상승해야함)
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          getInfo(data.access_token);
          console.log("나 여기있어~~~");
          // registCheck();
        }
        // navigate('/');
      });
  };
  const getInfo = async (access_token) => {
    // const code = new URL(window.location.href).searchParams.get('code');
    console.log(access_token);
    await axios
      .post(
        `https://kapi.kakao.com/v2/user/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log("여기 유저 정보 잘 넘어왔나~");
        console.log(res);
        // console.log(res.data.exist);
        if (res) {
          console.log(res.data.kakao_account.email);
          console.log(res.data.properties.nickname);
          setEmail(res.data.kakao_account.email);
          setKakaoNicknamemail(res.data.properties.nickname);
          // localStorage.setItem('token', res.headers.authorization);
          // 잘 작동한다 email을 kakao에서 잘 받아오면 된다.
        } else {
          console.log("test2");
        }
      })
      .catch((error) => console.log(error));
  };
  const registCheck = async () => {
    // const code = new URL(window.location.href).searchParams.get('code')
    await axios
      .get(`${baseUrl}/user/kakao/check?email=${email}`)
      .then((res) => {
        console.log("여기axios 잘 넘어왔나 확인");
        console.log(res);
        // console.log(res.data.exist);
        if (res.data.exist) {
          // console.log("test1");
          // 잘 작동한다 email을 kakao에서 잘 받아오면 된다.
          // window.location.href = `${kakaoUrl}/main`;
          getUserId(email);
          console.log("res.data.exist" + res.data.exist);
          //   window.location.href = `http://localhost:3000/main`;
        } else {
          console.log("test2");
        }
      })
      .catch((error) => console.log(error));
  };

  const regist = async () => {
    const user_temp = {
      nickname: nickname,
      campus: selectedOption,
      mileage: 0,
      email: email,
    };
    setUser(user_temp);
    console.log(user);
    await axios
      .post(`${baseUrl}/user/kakao/regist`, JSON.stringify(user_temp), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((res) => {
        console.log(res);
        getUserId(email);
      })
      .catch((error) => console.log(error));
    // window.location.href = `${kakaoUrl}/main`;
    // window.location.href = `http://localhost:3000/main`;
  };

  return (
    <Pages>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            margin: "8% auto",
            width: "450px",
            height: "480px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img src={ssavival} alt="" style={{ width: "300px", padding: 10 }} />
          <Row>
            <Text>닉네임 중복검사</Text>
            <InputBox>
              <Input
                type="text"
                placeholder="닉네임을 입력하세요."
                onChange={handleNicknameChange}
              />
            </InputBox>
          </Row>
          <Row>
            <Text>지역 선택</Text>
            <DropBox name="캠퍼스" onChange={handleOptionChange}>
              <option value="0">서울</option>
              <option value="1">대전</option>
              <option value="2">광주</option>
              <option value="3">구미</option>
              <option value="4">부울경</option>
            </DropBox>

            <Button
              sx={{
                fontFamily: "neodgm",
                bgcolor: "#3396F4",
                color: "white",
                width: "350px",
                marginTop: "30px",
                boxShadow: "none", // 그림자 없애기
                "&:hover": {
                  bgcolor: "#bcb6ff",
                  color: "white",
                  // boxShadow: "none",
                },
              }}
              variant="contained"
              onClick={regist}
            >
              입장
            </Button>
            <br />
          </Row>
        </Box>
      </div>
    </Pages>
  );
}
