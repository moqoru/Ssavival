import cafeteria from "../../assets/backgrounds/cafeteria.png";
import classroom from "../../assets/backgrounds/classroom.png";
import class_desk from "../../assets/backgrounds/class_desk.png";
import consultant from "../../assets/backgrounds/consultant.png";
import consultant_desk from "../../assets/backgrounds/consultant_desk.png";
import locker from "../../assets/backgrounds/locker.png";
import monitor from "../../assets/backgrounds/monitor.png";
import laptop from "../../assets/backgrounds/laptop.png";

const initialState = {
  gameTitleData: [
    "제한 시간 내 주어진 명령어를 모두 입력해봐!",
    "사물함을 열어서 책을 꺼내자!",
    "틀린 맞춤법 글자에 연필로 체크해봐!",
    "IP주소 빈칸을 빠르게 입력해봐!",
    "연상되는 단어를 입력해봐!",
    "휴지 5장을 빠르게 쭉- 뽑아보쟈!",
    "상황에 가장 알맞는 MM 이모지를 선택해보쟈!",
    "카드를 끌어 태그하고 밥먹자!",
    "드래그해서 빈 자리에 앉혀줘!",
    "조각난 퍼즐을 맞춰보자!",
    "움직이는 퇴실체크를 눌러보쟈",
    "틀린그림찾기 테스트",
  ],
  pageBgs: [
    class_desk,
    locker,
    consultant_desk,
    class_desk,
    classroom,
    consultant,
    class_desk,
    cafeteria,
    cafeteria,
    classroom,
    classroom,
    class_desk,
  ],
  containerBgs: ["moniter", "", "", "", "", "", "", "", "", "", "moniter"],
  remindAnswer: "",
  remindWordList: [],
  round: 0,
  title: null,
  pageBg: null,
  containerBg: null,
  score: 0,
  totalScore: 0,
  nextComp: false,
  count: 0,
  timerBombLimit: 0,
  timerBombActive: false,
  minigameClear: false, //미니 게임 성공 여부
  minigameActive: false,
  gameMode: "single",
  selectedEmojiIndex: null,
  emojiResult: "false",
  interval: false, //미니 게임 끝나고 점수 표시
  pointsCenter: [[0, 0, 0]],
  quizImgSize: { width: 600, height: 400 },
  quizImgUrl: { left: "", right: "" },
  gameRecord: [],
  gameRanking: [],
  firstTypo: [],
  secondTypo: [],
  karloImage: "",
};

function gameReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case "GET_REMIND_ANSWER":
      console.log(payload.data.wordList);
      return {
        ...state,
        remindAnswer: payload.data.answer.choices[0].text.trim(),
        remindWordList: payload.data.wordList,
      };
    case "INCREMENT_COUNT":
      return { ...state, count: payload.count + 1 };
    case "SET_GAME_MODE":
      return { ...state, gameMode: payload.gameMode };
    case "SET_MINIGAME_START":
      console.log("SET_MINIGAME_START", payload);
      return {
        ...state,
        title: state.gameTitleData[state.round],
        pageBg: state.pageBgs[state.round],
        containerBg: state.containerBgs[state.round],
        round: state.round + 1,
        timerBombActive: true,
        timerBombLimit: 10,
        minigameClear: false,
        minigameActive: true,
        interval: false,
      };
    case "SET_MINIGAME_CLEAR":
      console.log("SET_MINIGAME_CLEAR");
      return {
        ...state,
        timerBombActive: false,
        // timerBombLimit: 10,
        minigameClear: true,
        minigameActive: false,
      };
    case "SET_MINIGAME_FAIL":
      console.log("SET_MINIGAME_FAIL");
      return {
        ...state,
        timerBombActive: false,
        timerBombLimit: 0,
        minigameClear: false,
        minigameActive: false,
        score: 0,
        interval: true,
      };
    case "UPDATE_SCORE":
      console.log("UPDATE_SCORE", payload);
      return {
        ...state,
        totalScore: state.totalScore + Math.ceil(payload / 10),
        score: Math.ceil(payload / 10),
        interval: true,
      };
    case "SET_EMOJI_INDEX":
      console.log(payload);
      return {
        ...state,
        selectedEmojiIndex: payload,
      };
    case "SET_EMOJI_RESULT":
      console.log(payload);
      return {
        ...state,
        emojiResult: payload,
      };
    case "FETCH_QUIZ_IMAGE":
      return {
        ...state,
        pointsCenter: payload.pointsCenter,
        quizImgSize: payload.quizImgSize,
        quizImgUrl: payload.quizImgUrl,
      };
    case "GET_KARLO_IMAGE":
      console.log("GET_KARLO_IMAGE", payload);
      return {
        ...state,
        karloImage: payload,
      };
    case "UPDATE_POINTS_CENTER":
      return {
        ...state,
        pointsCenter: payload,
      };
    case "GET_GAMERECORD":
      console.log("GAMERRRRR", payload.data.gameImages);
      return {
        ...state,
        gameRecord: payload.data.gameImages,
      };
    case "GET_RANKING":
      return {
        ...state,
        gameRanking: payload.data.userList,
      };
    case "SET_FIRST_TYPO":
      return {
        ...state,
        firstTypo: payload,
      };
    case "SET_SECOND_TYPO":
      return {
        ...state,
        secondTypo: payload,
      };
    case "RESET_ROUND":
      return {
        ...state,
        round: 0,
      };
    default:
      return { ...state };
  }
}

export default gameReducer;
