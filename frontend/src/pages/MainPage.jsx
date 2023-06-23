import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import MainHeader from "../components/main/MainHeader";
import MainComp1 from "../components/main/MainComp1";
import MainComp2 from "../components/main/MainComp2";
import MainComp3 from "../components/main/MainComp3";
import MainComp4 from "../components/main/MainComp4";
import { useDispatch, useSelector } from "react-redux";
import { kakaoUrl } from "../redux/actions/url";
import { AccessAction } from "../redux/actions/AccessAction";
import { GameAction } from "../redux/actions/GameAction";
import { MainAction } from "../redux/actions/MainAction";
import back2 from "../assets/back2.png";

const Header = styled.div`
  margin-left: 20%;
  margin-right: 20%;
`;
const Comp = styled.div`
  display: flex;
  margin-left: 20%;
  margin-right: 20%;
`;
const Comp1 = styled.div`
  flex: 1;
  margin: 10px 10px;
`;
const Comp2 = styled.div`
  flex: 2;
  margin: 10px 10px;
`;
const Comp3 = styled.div`
  flex: 3;
  margin-top: 10px;
  margin-left: 10%;
`;
const Comp4 = styled.div`
  flex: 1;
  margin-top: 10px;

  margin-right: 10%;
`;

const Pages = styled.div`
  background-color: #f2f2f2;
  height: 100vh;
  background-image: url(${back2});
  background-size: cover;
  width: 100%;
  height: 100vh;
`;
function MainPage() {
  let activeIndex = 0;
  const [accessTokenState, setAccessTokenState] = useState(true);
  const dispatch = useDispatch();

  const characterRef = useRef(null);
  const character2Ref = useRef(null);
  let spritesheetElements = "";
  let spritesheetElement2 = "";

  useEffect(() => {
    dispatch(AccessAction.accessTokenTest())
      .then((res) => {
        //access_token이 유효하지 않을때 false로 바꿔주고 유효하면 true가 들어간다.
        console.log(res);
        setAccessTokenState(res.data.tokenState);
      })
      .catch((error) => {
        console.log(error);
      });
    // dispatch(AccessAction.accessTokenTest());
    dispatch(GameAction.getRanking());

    const spritesheets = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-HANK-2-SHEET.png",
    ];
    const spritesheet2 = [
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-JESSIE-SHEET.png",
    ];
    spritesheets.forEach((spritesheet, index) => {
      spritesheetElements += `<img src="${spritesheet}" class="PixelArtImage Character_sprite-sheet index-${index}" />`;
    });
    spritesheet2.forEach((spritesheet, index) => {
      spritesheetElement2 += `<img src="${spritesheet}" class="PixelArtImage Character_sprite-sheet index-${index}" />`;
    });
    if (characterRef.current) {
      characterRef.current.insertAdjacentHTML("beforeend", spritesheetElements);
      setActive(activeIndex);
    }

    if (character2Ref.current) {
      character2Ref.current.insertAdjacentHTML(
        "beforeend",
        spritesheetElement2
      );
      setActive(activeIndex);
    }
  }, []);

  function setActive(index) {
    activeIndex = index;
    document.querySelectorAll(`.active`).forEach((node) => {
      node.classList.remove("active");
    });
    document.querySelectorAll(`.index-${index}`).forEach((node) => {
      node.classList.add("active");
    });
  }

  useEffect(() => {
    //access_token이 유효하지 않으면 우선 refresh 토큰이 유효한지 확인(확인하고 유효하면 access_token 재발급해주기)
    console.log("access_token 변화 확인 => true여도 변화로 인지");
    // if(!accessTokenState){
    if (!localStorage.getItem("userId")) window.location.href = `${kakaoUrl}`;
    if (!accessTokenState) {
      dispatch(AccessAction.refreshTokenTest()).then((res) => {
        //refresh 토큰이 유효할 때
        if (res.data.tokenState) {
          localStorage.setItem("access_token", res.data.newAccessToken);
          //refresh 토큰이 없거나 유효하지 않을 때
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = `${kakaoUrl}`;
        }
      });
      // console.log("췤22");
    }
  }, [accessTokenState]);

  // 유저 정보 받아오기
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    dispatch(MainAction.getUserInfo(userId));
  }, []);

  return (
    <Pages>
      <Header>
        <MainHeader />
      </Header>
      <Comp>
        <Comp1>
          <MainComp1 />
        </Comp1>
        <Comp2>
          <MainComp2 />
        </Comp2>
      </Comp>

      <div style={{ display: "flex", gap: 20 }}>
        <div
          class="Character Character--walk-down"
          ref={characterRef}
          style={{ transform: "translateX(50px) translateY(150px)" }}
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-Shadow.png"
            alt=""
            class="Character_shadow PixelArtImage"
          />
        </div>

        <Comp3>
          <MainComp3 />
        </Comp3>
        <Comp4>
          <MainComp4 />
        </Comp4>

        <div
          class="Character Character--walk-down"
          ref={character2Ref}
          style={{ transform: "translateX(-50px) translateY(150px)" }}
        >
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-Shadow.png"
            alt=""
            class="Character_shadow PixelArtImage"
          />
        </div>
      </div>
    </Pages>
  );
}
export default MainPage;
