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