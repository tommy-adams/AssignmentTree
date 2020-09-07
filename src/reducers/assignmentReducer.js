import types from "../actions/types";

const initialState = {
	assignments: []
};

const loadAssignments = (state, newAssignments) => {
  return { ...state, assignments: [...newAssignments], total: newAssignments.length };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_ASSIGNMENTS_SUCCESS:
			return loadAssignments(state, action.payload);
		default:
			return state;
	}
}