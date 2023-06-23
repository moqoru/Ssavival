import { flaskUrl } from "./url";

export const fetchQuizImage = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        // "http://127.0.0.1:5000/game/difference/get-next-quiz"
        `${flaskUrl}/game/difference/get-next-quiz`
      );
      const data = await response.json();
      dispatch({
        type: "FETCH_QUIZ_IMAGE",
        payload: {
          pointsCenter: data.pts,
          quizImgSize: { width: data.width, height: data.height },
          quizImgUrl: {
            left: data.quizImgLeftUrl,
            right: data.quizImgRightUrl,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
