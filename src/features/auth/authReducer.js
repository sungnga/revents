import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';

const initialState = {
	authenticated: false,
	currentUser: null
};

// the payload here is the result we got back from firebase of the auth user credential
// the provider is the method the user signed into the app
// email/password = password, fb = facebook.com, google = google.com
function authReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SIGN_IN_USER:
			return {
				...state,
				authenticated: true,
				currentUser: {
					email: payload.email,
					photoURL: payload.photoURL,
					uid: payload.uid,
					displayName: payload.displayName,
					providerId: payload.providerData[0].providerId
				}
			};
		case SIGN_OUT_USER:
			return {
				...state,
				authenticated: false,
				currentUser: null
			};
		default:
			return state;
	}
}

export default authReducer;
