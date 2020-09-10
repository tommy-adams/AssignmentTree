import types from "../actions/types";

const initialState = {
	schedule: []
};

const loadClasses = (state, schedule) => {
  return { ...state, schedule };
};

const createClass = (state, newSchedule) => {
	const { schedule, total } = state;
	return { ...state, schedule: [ ...schedule, newSchedule ], total: total + 1 };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_CLASSES_SUCCESS:
			return loadClasses(state, action.payload);
		case types.CREATE_CLASS_SUCCESS:
			return createClass(state, action.payload);
		default:
			return state;
	}
}