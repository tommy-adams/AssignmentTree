import { combineReducers } from "redux";
import assignment from "./assignmentReducer";
import sched from "./classReducer";

export default combineReducers({
  assignment,
  sched
});