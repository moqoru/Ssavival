import axios from "axios";
import { baseUrl } from "./url";

function accessTokenTest() {
  return async (dispatch) => {
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    try {
      const response = await axios.get(
        `${baseUrl}/token/access/valid?accessToken=${accessToken}`
      );
      console.log("여기 access token 검사를 잘 했나 확인");
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

function refreshTokenTest() {
  return async (dispatch) => {
    const refreshToken = localStorage.getItem("refresh_token");

    try {
      const response = await axios.get(
        `${baseUrl}/token/refresh/valid?refreshToken=${refreshToken}`
      );
      console.log("refresh 토큰 테스트");
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
export const AccessAction = {
  accessTokenTest,
  refreshTokenTest,
};
