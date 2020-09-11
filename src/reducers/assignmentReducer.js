import types from "../actions/types";

const initialState = {
	assignments: []
};

const loadAssignments = (state, assignments) => {
  return { ...state, assignments, total: assignments.length };
};

const createAssignment = (state, newAssignment) => {
	const { assignments, total } = state;
	return { ...state, assignments: [ ...assignments, newAssignment ], total: total + 1 };
};

const updateAssignment = (state, updatedAssignment) => {
	const { assignments } = state;
	const tempAssignments = assignments;
	const target = tempAssignments.filter(a => a._id === updatedAssignment._id)[0];
	const index = tempAssignments.indexOf(target);
	tempAssignments.splice(index, 1);
	tempAssignments.push(updatedAssignment);
	return { ...state, assignments: tempAssignments };
};

const deleteAssignment = (state, deletedAssignment) => {
	const { assignments, total } = state;
	const tempAssignments = assignments;
	const target = tempAssignments.filter(a => a._id === deletedAssignment._id)[0];
	const index = tempAssignments.indexOf(target);
	tempAssignments.splice(index, 1);
	return { ...state, assignments: tempAssignments, total: total - 1 };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_ASSIGNMENTS_SUCCESS:
			return loadAssignments(state, action.payload);
		case types.CREATE_ASSIGNMENT_SUCCESS:
			return createAssignment(state, action.payload);
		case types.UPDATE_ASSIGNMENT_SUCCESS:
			return updateAssignment(state, action.payload);
		case types.DELETE_ASSIGNMENT_SUCCESS:
			return deleteAssignment(state, action.payload);
		default:
			return state;
	}
}