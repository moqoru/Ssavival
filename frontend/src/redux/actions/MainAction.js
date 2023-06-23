import axios from "axios";
import { baseUrl } from "./url";
import { useDispatch } from "react-redux";

function getUserInfo(userId) {
  return async (dispatch) => {
    const url = `${baseUrl}/main/${userId}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data.user;
        console.log("getUserInfo axios성공 및 데이타:", data);
        dispatch({ type: "GET_USER", payload: data });
      })
      .catch((error) => {
        console.log("getUserInfo axios실패 및 에러:", error);
      });
  };
}

function getCampusAvg() {
  return async (dispatch) => {
    const url = `${baseUrl}/main/average`;
    await axios(url)
      .then((response) => {
        const data = response.data;
        console.log("getCampusAvg axios성공 및 데이타:", response);
        dispatch({ type: "GET_CAMPUS_AVG", payload: data });
      })
      .catch((error) => {
        console.log("getCampusAvg axios실패 및 에러:", error);
      });
  };
}

function getRanking() {
  return async (dispatch) => {
    const url = `${baseUrl}/main/ranking`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("getRanking axios성공 및 데이타:", data);
        dispatch({ type: "GET_RANKING", payload: data });
      })
      .catch((error) => {
        console.log("getRanking axios실패 및 에러:", error);
      });
  };
}

function getStatistics(userId) {
  return async (dispatch) => {
    const url = `${baseUrl}/main/statistics/${userId}`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("getStatistics axios성공 및 데이타:", data);
        dispatch({ type: "GET_STATISTICS", payload: data });
      })
      .catch((error) => {
        console.log("getStatistics axios실패 및 에러:", error);
      });
  };
}

function getRecords(userId) {
  console.log("getRecords 액션 수행");

  return async (dispatch) => {
    const url = `${baseUrl}/main/record/${userId}`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("getRecords axios성공 및 데이타:", data);
        dispatch({ type: "GET_RECORDS", payload: data });
      })
      .catch((error) => {
        console.log("getRecords axios실패 및 에러:", error);
      });
  };
}

function getChallenge(challengerId) {
  console.log("getChallenge 액션 수행");

  return async (dispatch) => {
    const url = `${baseUrl}/main/game/${challengerId}`;
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        console.log("getChallenge axios성공 및 데이타:", data);
        dispatch({ type: "GET_CHALLENGE", payload: { data } });
      })
      .catch((error) => {
        console.log("getChallenge axios실패 및 에러:", error);
      });
  };
}

function patchStatistics(data) {
  console.log("여기까지", data);
  const req = data;
  return async () => {
    const url = `${baseUrl}/main/statistics/done/`;
    await axios
      .patch(url, JSON.stringify(req), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("patchStatistics axios성공 및 데이타:", data);
      })
      .catch((error) => {
        console.log("patchStatistics axios실패 및 에러:", error);
      });
  };
}

function postRecord(data) {
  console.log("datassss", data);
  return async (dispatch) => {
    const url = `${baseUrl}/main/record/save`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export const MainAction = {
  getUserInfo,
  getCampusAvg,
  getRanking,
  getStatistics,
  getRecords,
  getChallenge,
  patchStatistics,
  postRecord,
};
