import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import SwipeableViews from "react-swipeable-views";
import DialogContent from "@mui/material/DialogContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchBar from "./SearchBar";
import start from "../../assets/start.png";
import exit from "../../assets/exit.png";
import happy_pepe2 from "../../assets/happy_pepe2.png";
import find from "../../assets/find.png";
import { GameAction } from "../../redux/actions/GameAction";
import Ranking2 from "./Ranking2";
import gameReducer from "../../redux/reducers/game";
import { fetchQuizImage } from "../../redux/actions/DifferenceGameAction";

const Comp1 = styled.div`
  font-family: "neodgm";
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
`;

const Title = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 1rem;
  }
`;

const HoverBox = styled.div`
  font-family: "neodgm";
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 50%;

  // Box img {
  //   transition: all 0.2s linear;
  // }

  // &:hover img {
  //   transform: scale(1.4);
  // }

  > div:hover {
    transform: scale(1.2);
  }
`;

const RankingContainer = styled.div`
  fontfamily: "neodgm";
  width: 380px;
  height: 300px;
  margin: 10px auto;
`;

export default function MainComp1() {
  const gameMode = useSelector((state) => state.gameMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSinglePlayerClick = () => {
    dispatch({ type: "SET_GAME_MODE", payload: { gameMode: "single" } });
    dispatch(GameAction.getRemindAnswer("한식"));
    dispatch(GameAction.getKarloImage("classroom"));
    dispatch(GameAction.gameStart(localStorage.getItem("userId")));
    dispatch(fetchQuizImage());
    navigate("/start"); // /start 경로로 이동
  };

  const handleMultiPlayerClick = () => {
    setOpen(true);
  };

  const campus = useSelector((state) => state.mainReducer.campus);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(campus); //default campus는 user의 campus

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ value, index, children }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  return (
    <Comp1>
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          backgroundColor: "#FFE651",
          borderRadius: 12,
        }}
      >
        <Title>
          <img
            src={happy_pepe2}
            alt=""
            style={{ width: "10%", height: "5%", marginRight: 5 }}
          />
          <span>싸피를 즐기러 가보자!</span>
          <img
            src={happy_pepe2}
            alt=""
            style={{ width: "10%", height: "5%", marginRight: 5 }}
          />
        </Title>
        <HoverBox>
          <Box
            sx={{
              bgcolor: "white",
              width: "35%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1rem",
              cursor: "pointer", // 추가
            }}
            onClick={handleSinglePlayerClick}
          >
            <div>싱글플레이</div>

            <img src={start} alt="" style={{ width: "90%", height: "90%" }} />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              width: "35%",
              height: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1rem",
              cursor: "pointer", // 추가
            }}
            onClick={handleMultiPlayerClick}
          >
            <div>멀티플레이</div>

            <img src={exit} alt="" style={{ width: "100%", height: "100%" }} />
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogContent
              style={{
                width: "480px",
                height: "auto",
                backgroundImage: `url(${find})`, // Add your image path here
                backgroundSize: "cover",
              }}
            >
              <SearchBar />
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  centered
                >
                  <Tab value={0} label="서울" />
                  <Tab value={1} label="대전" />
                  <Tab value={2} label="광주" />
                  <Tab value={3} label="구미" />
                  <Tab value={4} label="부울경" />
                </Tabs>
              </Box>
              <SwipeableViews index={value} onChangeIndex={handleChange}>
                <div role="tabpanel" hidden={value !== 0} id="tabpanel-0">
                  {value === 0 && (
                    <RankingContainer>
                      <Ranking2 value={0} />
                    </RankingContainer>
                  )}
                </div>
                <div role="tabpanel" hidden={value !== 1} id="tabpanel-1">
                  {value === 1 && (
                    <RankingContainer>
                      <Ranking2 value={1} />
                    </RankingContainer>
                  )}
                </div>
                <div role="tabpanel" hidden={value !== 2} id="tabpanel-2">
                  {value === 2 && (
                    <RankingContainer>
                      <Ranking2 value={2} />
                    </RankingContainer>
                  )}
                </div>
                <div role="tabpanel" hidden={value !== 3} id="tabpanel-3">
                  {value === 3 && (
                    <RankingContainer>
                      <Ranking2 value={3} />
                    </RankingContainer>
                  )}
                </div>
                <div role="tabpanel" hidden={value !== 4} id="tabpanel-4">
                  {value === 4 && (
                    <RankingContainer>
                      <Ranking2 value={4} />
                    </RankingContainer>
                  )}
                </div>
              </SwipeableViews>
            </DialogContent>
          </Dialog>
        </HoverBox>
      </Box>
    </Comp1>
  );
}
