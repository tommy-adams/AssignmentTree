import types from "../actions/types";

const initialState = {
	schedule: []
};

const loadClasses = (state, schedule) => {
  return { ...state, schedule };
};

export default function(state = initialState, action) {
	switch(action.type) {
		case types.LOAD_CLASSES_SUCCESS:
			return loadClasses(state, action.payload);
		default:
			return state;
	}
}