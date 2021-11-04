import { toast } from 'react-toastify';
import firebase from '../config/firebase';
import { setUserProfileData } from './firestoreService';

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
// After register a user in firebase, set the user profile data in firestore db
export async function registerInFirebase(creds) {
	try {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(creds.email, creds.password);
		await result.user.updateProfile({
			displayName: creds.displayName
		});
		return await setUserProfileData(result.user);
	} catch (error) {
		throw error;
	}
}

// Enable social login
export async function socialLogin(selectedProvider) {
	let provider;
	if (selectedProvider === 'facebook') {
		provider = new firebase.auth.FacebookAuthProvider();
	}
	if (selectedProvider === 'google') {
		provider = new firebase.auth.GoogleAuthProvider();
	}
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		console.log(result);
		if (result.additionalUserInfo.isNewUser) {
			await setUserProfileData(result.user);
		}
	} catch (error) {
		toast.error(error.message);
	}
}

// Update user password
export function updateUserPassword(creds) {
	const user = firebase.auth().currentUser;
	return user.updatePassword(creds.newPassword1);
}

// Upload an image to FirebaseStorage
export function uploadToFirebaseStorage(file, filename) {
	const user = firebase.auth().currentUser;
	const storageRef = firebase.storage().ref();
	return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

// delete a photo from firebaseStorage
export function deleteFromFirebaseStorage(filename) {
	const userUid = firebase.auth().currentUser.uid;
	const storageRef = firebase.storage().ref();
	const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
	return photoRef.delete();
}
