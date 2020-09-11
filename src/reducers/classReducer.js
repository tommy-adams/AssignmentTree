import types from "../actions/types";

const initialState = {
	schedule: []
};

const loadClasses = (state, schedule) => {
  return { ...state, schedule, total: schedule.length };
};

const createClass = (state, newSchedule) => {
	const { schedule, total } = state;
	return { ...state, schedule: [ ...schedule, newSchedule ], total: total + 1 };
};

const updateClass = (state, updatedSchedule) => {
	const { schedule } = state;
	const tempSchedule = schedule;
	const target = tempSchedule.filter(c => c._id === updatedSchedule._id)[0];
	const index = tempSchedule.indexOf(target);
	tempSchedule.splice(index, 1);
	tempSchedule.push(updatedSchedule);
	return { ...state, schedule: tempSchedule };
};

const deleteClass = (state, deletedClass) => {
	const { schedule, total } = state;
	const tempSchedule = schedule;
	const target = tempSchedule.filter(c => c._id === deletedClass._id)[0];
	const index = tempSchedule.indexOf(target);
	tempSchedule.splice(index, 1);
	return { ...state, schedule: tempSchedule, total: total - 1 };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_CLASSES_SUCCESS:
			return loadClasses(state, action.payload);
		case types.CREATE_CLASS_SUCCESS:
			return createClass(state, action.payload);
		case types.UPDATE_CLASS_SUCCESS:
			return updateClass(state, action.payload);
		case types.DELETE_CLASS_SUCCESS:
			return deleteClass(state, action.payload);
		default:
			return state;
	}
}