import { combineReducers } from "redux";
import { gnomesReducer, gnomeReducer } from "./gnomes";
import { backButtonReducer } from "./backbutton";

const rootReducer = combineReducers({
  gnomes: gnomesReducer,
  gnome: gnomeReducer,
  showButton: backButtonReducer
});

export default rootReducer;
