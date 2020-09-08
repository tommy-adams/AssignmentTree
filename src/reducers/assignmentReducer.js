import types from "../actions/types";

const initialState = {
	assignments: []
};

const loadAssignments = (state, assignments) => {
  return { ...state, assignments, total: assignments.length };
};

const createAssignment = (state, newAssignment) => {
	const { assignments, total } = this.state;
	return { ...state, assignments: [ ...assignments, newAssignment ], total: total + 1 };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_ASSIGNMENTS_SUCCESS:
			return loadAssignments(state, action.payload);
		case types.CREATE_ASSIGNMENT_SUCCESS:
			return createAssignment(state, action.payload);
		default:
			return state;
	}
}