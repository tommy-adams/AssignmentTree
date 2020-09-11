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

export const createClass = data => async dispatch => {
  const reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  await axios.post("/classes/create", data, reqOptions)
    .then(async c => dispatch({
      type: types.CREATE_CLASS_SUCCESS,
      payload: await c.data
    }));
  
  return "Created!";
};

export const updateClass = data => async dispatch => {
  const reqOptions = {
    headers: { "Content-Type": "application/json" }
  };

  await axios.patch("/classes/update", data, reqOptions)
    .then(async c => dispatch({
      type: types.UPDATE_CLASS_SUCCESS,
      payload: await c.data
    }));
  
  return "Updated!";
};

export const deleteClass = query => async dispatch => {
  const reqOptions = {
    headers: { "Authentication": "***" }
  };

  await axios.delete(`/classes/delete${query}`, reqOptions)
    .then(async c => dispatch({
      type: types.DELETE_CLASS_SUCCESS,
      payload: await c.data
    }));
  
  return "Deleted!";
};