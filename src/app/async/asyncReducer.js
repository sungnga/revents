// Constants
const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';
export const APP_LOADED = 'APP_LOADED';

// Async action creator functions
export function asyncActionStart() {
	return {
		type: ASYNC_ACTION_START
	};
}

export function asyncActionFinish() {
	return {
		type: ASYNC_ACTION_FINISH
	};
}

export function asyncActionError(error) {
	return {
		type: ASYNC_ACTION_ERROR,
		payload: error
	};
}

// Initial state
const initialState = {
	loading: false,
	error: null,
	initialized: false
};

// Async reducer
export default function asyncReducer(state = initialState, { type, payload }) {
	switch (type) {
		// Turns the loading indicator on
		case ASYNC_ACTION_START:
			return {
				...state,
				loading: true,
				error: null
			};
		// Turns the loading indicator off
		case ASYNC_ACTION_FINISH:
			return {
				...state,
				loading: false
			};
		// Stores error message getting back from async operation
		case ASYNC_ACTION_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		case APP_LOADED:
			return {
				...state,
				initialized: true
			};
		default:
			return state;
	}
}
