import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import pepe from "../../assets/pepe.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";

function MainHeader() {
  //redux state값 가져오기
  const nickname = useSelector((state) => state.mainReducer.nickname);

  return (
    <AppBar
      elevation={0}
      position="relative"
      // variant="outlined"
      style={{
        backgroundColor: "transparent",
        height: "50px",
        boxShadow: "none",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "black",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                color: "white",
                fontFamily: "gmarket",
                marginRight: "2%",
              }}
            >
              {nickname}님, 환영합니다!
            </div>
            <LogoutBtn />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
