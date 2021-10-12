import {
	asyncActionError,
	asyncActionFinish,
	asyncActionStart
} from '../../app/async/asyncReducer';
import { delay } from '../../app/common/util/utils';

// Action constant
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// Action creator
export function increment(amount) {
	// We can return an async function because of redux-thunk
	// We get the dispatch method from react-redux
	// This allows us to dispatch multiple actions
	return async function (dispatch) {
		// This will turn the loading indicator from false to true
		dispatch(asyncActionStart());
		try {
			// Delay for 1 second before dispatching the next action
			await delay(1000);
			dispatch({ type: INCREMENT_COUNTER, payload: amount });
			// Turn the loading indicator off - from true to false
			dispatch(asyncActionFinish());
		} catch (error) {
			// If there's an error, send the error to the store
			dispatch(asyncActionError(error));
		}
	};
}

export function decrement(amount) {
	return async function (dispatch) {
		// This will turn the loading indicator from false to true
		dispatch(asyncActionStart());
		try {
			await delay(1000);
			dispatch({ type: DECREMENT_COUNTER, payload: amount });
			// Turn the loading indicator off - from true to false
			dispatch(asyncActionFinish());
		} catch (error) {
			dispatch(asyncActionError(error));
		}
	};
}

// Initial State
const initialState = {
	data: 42
};

// The reducer function
function testReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT_COUNTER:
			return {
				...state,
				data: state.data + action.payload
			};
		case DECREMENT_COUNTER:
			return {
				...state,
				data: state.data - action.payload
			};
		default:
			return state;
	}
}

export default testReducer;
