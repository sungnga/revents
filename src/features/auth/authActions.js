import firebase from '../../app/config/firebase';
import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import { APP_LOADED } from '../../app/async/asyncReducer';
import {
	dataFromSnapshot,
	getUserProfile
} from '../../app/firestore/firestoreService';
import { listenToCurrentUserProfile } from '../profiles/profileActions';

// Action creators
export function signInUser(user) {
	return {
		type: SIGN_IN_USER,
		payload: user
	};
}

// This action creator verifies whether the user is authenticated or not
// Once the store object is created, it dispatches this action creator
export function verifyAuth() {
	return function (dispatch) {
		// Listening to auth state change of firebase auth
		return firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// Update currentUser object in authReducer
				dispatch(signInUser(user));
				// Get user profile in Firestore db
				const profileRef = getUserProfile(user.uid);
				// The user profile data is stored in the snapshot
				// dataFromSnapshot function shapes the data to usable format
				// listenToCurrentUserProfile action stores the data in profileReducer
				// APP_LOADED action sets the initialized flag to true in asyncReducer
				// When initialized flag is set to false, the LoadingComponent renders
				profileRef.onSnapshot((snapshot) => {
					dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
					dispatch({ type: APP_LOADED });
				});
			} else {
				dispatch(signOutUser());
				dispatch({ type: APP_LOADED });
			}
		});
	};
}

export function signOutUser() {
	return {
		type: SIGN_OUT_USER
	};
}
