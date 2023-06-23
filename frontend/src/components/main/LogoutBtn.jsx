import React from "react";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { kakaoUrl } from "../../redux/actions/url";

export default function Logoutbtn() {
  useEffect(() => {
    // Kakao JavaScript SDK 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    // Kakao SDK 초기화
    script.onload = () => {
      window.Kakao.init("0fe168522b983b72237c2dfd782649a2");
    };
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogoutClick = () => {
    const ACCESS_TOKEN = localStorage.getItem("access_token");
    // 카카오 API 로그아웃 요청
    fetch("https://kapi.kakao.com/v1/user/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("들어는 갔나");
          if (window.Kakao) {
            console.log(window.Kakao);
            console.log("로그아웃되었습니다1.");
            // window.Kakao.Auth.setAccessToken(undefined);
            window.Kakao.Auth.logout();
            localStorage.clear();
            window.location.href = `${kakaoUrl}`;
            // .then(function(res) => {
            //     console.log(window.Kakao.Auth.getAccessToken());
            // });
            // console.log(window.Kakao);
            // console.log("로그아웃되었습니다2.");
            // window.Kakao.Auth.setRefreshToken(undefined);
          }
          // 액세스 토큰과 리프레시 토큰 삭제
          // 페이지 새로고침
          // window.location.reload();
        } else {
          console.log("로그아웃 실패:", response.status);
          window.location.href = `${kakaoUrl}`;
        }
      })
      .catch((error) => {
        console.log("오류 발생:", error);
      });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <LogoutIcon
        style={{ cursor: "pointer", color: "white" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleLogoutClick}
      />
      {isHovered && (
        <span
          style={{
            position: "absolute",
            top: "130%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            color: "#000",
            width: "fit-content",
            padding: "5px 10px",
            borderRadius: "6px",
            visibility: "visible",
            whiteSpace: "nowrap", // Add this line
            opacity: "1",
            transition: "opacity 0.3s",
            fontFamily: "gmarket",
          }}
        >
          로그아웃
        </span>
      )}
    </div>
  );
}
