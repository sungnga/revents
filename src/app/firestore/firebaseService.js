import firebase from '../config/firebase';

// The creds is user's email and password coming from LoginForm
// The result returned from firebase is an auth user object
// The user object contains data about this user
export function signInWithEmail(creds) {
	return firebase
		.auth()
		.signInWithEmailAndPassword(creds.email, creds.password);
}

// Sign out user in firebase
export function signOutFirebase() {
	return firebase.auth().signOut();
}

// Register new user in firebase
// After registering a user is completed, add the displayName property to the user object
export async function registerInFirebase(creds) {
	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);
		return await result.user.updateProfile({
			displayName: creds.displayName
		});
	} catch (error) {
		throw error;
	}
}
