import types from "./types";
import axios from "axios";

export const loadClasses = query => async dispatch => {
  const request = query ? `/classes?${query}` : "/classes";
  await axios.get(request)
    .then(async c => dispatch({
      type: types.LOAD_CLASSES_SUCCESS,
      payload: await c.data
    }));
};