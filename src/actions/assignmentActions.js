import types from "./types";
import axios from "axios";

export const loadAssignments = query => async dispatch => {
  const request = query ? `/assignments?${query}` : "/assignments";
  await axios.get(request)
    .then(async assignment => dispatch({
      type: types.LOAD_ASSIGNMENTS_SUCCESS,
      payload: await assignment.data
    }));
};

export const createAssignment = data => async dispatch => {
  const reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  await axios.post("/assignments/create", data, reqOptions)
    .then(async assignment => dispatch({
      type: types.CREATE_ASSIGNMENT_SUCCESS,
      payload: await assignment.data
    }));
};