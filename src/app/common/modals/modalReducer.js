// Constants
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

// Action creators
export function openModal(payload) {
	return {
		type: OPEN_MODAL,
		payload
	};
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	};
}

// State
const initialState = null;

// Modal reducer
export default function modalReducer(state = initialState, { type, payload }) {
	switch (type) {
		case OPEN_MODAL:
			// destructure what we're going to get from the payload
			// modalType is the type of modal i.e login or register
			// modalProps is any properties that that modalType has
			const { modalType, modalProps } = payload;
			return { modalType, modalProps };
		case CLOSE_MODAL:
			return null;
		default:
			return state;
	}
}
