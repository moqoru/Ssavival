import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useSelector } from "react-redux";

const Rank = styled.div`
  font-family: "neodgm";
  color: black;
  div {
    text-align: center;
  }
`;

const Pag = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Ranking() {
  const campus = useSelector((state) => state.mainReducer.campus);
  console.log("campus" + campus);

  //redux에서 campus에 맞는 top 5 users 가져오기
  const users = useSelector((state) => state.mainReducer.users);
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    if (users && users.length > 0) {
      const filterUsers = users.filter((user) => user.campus === campus);

      const calculatedTopFive = filterUsers.slice(0, 5).map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
      console.log(calculatedTopFive);

      setTopFive(calculatedTopFive); // topFive 상태 업데이트
    }
  }, [users, campus]);

  // 캠퍼스별 이름 붙여주기
  function getCampusName(campus) {
    switch (campus) {
      case 0:
        return "서울";
      case 1:
        return "대전";
      case 2:
        return "광주";
      case 3:
        return "구미";
      case 4:
        return "부울경";
      default:
        return "00";
    }
  }

  const [campusName, setCampusName] = useState("00");
  useEffect(() => {
    setCampusName(getCampusName(campus));
  }, [campus]);

  const campusRanking = useSelector((state) => state.gameReducer.gameRanking);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const rowsPerPage = 6;
  const getRankingList = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (getRankingList.length === 0) {
      return getRankingList;
    }
    return getRankingList.slice(startIndex, endIndex);
  };

  return (
    <Rank>
      <Stack>
        <Box>{campusName} 캠퍼스 Top5</Box>
      </Stack>
      <Box sx={{ width: "100%", height: "100px" }}>
        <Table sx={{ textAlign: "center", margin: "5%" }}>
          <TableBody>
            {topFive.map((item) => (
              <TableRow key={item.rank}>
                <TableCell
                  sx={{
                    width: "0%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontFamily: "gmarket",
                  }}
                >
                  {item.rank}
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontFamily: "gmarket",
                  }}
                >
                  {item.nickname}
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    padding: 0.7,
                    textAlign: "center",
                    fontSize: "0.9rem",
                    fontFamily: "gmarket",
                  }}
                >
                  {item.mileage} M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Pag>
          <Stack spacing={1}>
            <Pagination
              size="small"
              count={Math.ceil(getRankingList.length / rowsPerPage)}
              variant="outlined"
              color="secondary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Pag> */}
      </Box>
    </Rank>
  );
}
