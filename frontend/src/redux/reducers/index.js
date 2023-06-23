import { combineReducers } from "redux";
import gameReducer from "./game";
import mainReducer from "./main";

const rootReducer = combineReducers({
  gameReducer,
  mainReducer,
});

export default rootReducer;
