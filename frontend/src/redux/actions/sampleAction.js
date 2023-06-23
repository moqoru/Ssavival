import axios from "axios";
import { baseUrl } from "./url";

function getSample(lat, lng) {
  const data = { lat, lng };
  console.log("내 현재위치는,", lat, lng);
  return async (dispatch) => {
    const url = `${baseUrl}/main/distance-recommendation-list`;
    await axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        const data = response.data.stores;
        dispatch({ type: "GET_DISTANCE_LIST_SUCCESS", payload: { data } });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  };
}

export const sampleAction = {
  getSample,
};
