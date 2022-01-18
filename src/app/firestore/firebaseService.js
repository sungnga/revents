import { setUserProfileData } from './firestoreService';
import { toast } from 'react-toastify';
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	updateProfile,
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	updatePassword
} from 'firebase/auth';
import {
	getDatabase,
	ref as fbRef,
	push,
	query,
	orderByKey,
	limitToLast
} from 'firebase/database';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	deleteObject
} from 'firebase/storage';
import { app } from '../config/firebase';

const auth = getAuth(app);
const db = getDatabase(app);

// convert a firebase object data to an array
// firebase data returns as a snapshot object
export function firebaseObjectToArray(snapshot) {
	if (snapshot) {
		return Object.entries(snapshot).map((e) =>
			Object.assign({}, e[1], { id: e[0] })
		);
	}
}

// The creds is user's email and password coming from LoginForm
// The result returned from firebase is an auth user object
// The user object contains data about this user
export function signInWithEmail(creds) {
	return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

// Sign out user in firebase
export function signOutFirebase() {
	return signOut(auth);
}

// Register new user in firebase
// After registering a user is completed, add the displayName property to the user object
// After register a user in firebase, set the user profile data in firestore db
export async function registerInFirebase(creds) {
	try {
		const result = await createUserWithEmailAndPassword(
			auth,
			creds.email,
			creds.password
		);
		await updateProfile(result.user, {
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
		provider = new FacebookAuthProvider();
	}
	if (selectedProvider === 'google') {
		provider = new GoogleAuthProvider();
	}
	try {
		const result = await signInWithPopup(auth, provider);
		console.log(result);
		if (result._tokenResponse.isNewUser) {
			await setUserProfileData(result.user);
		}
	} catch (error) {
		toast.error(error.message);
	}
}

// Update user password
export function updateUserPassword(creds) {
	const user = auth.currentUser;
	return updatePassword(user, creds.newPassword1);
}

// Upload an image to FirebaseStorage
export function uploadToFirebaseStorage(file, filename) {
	const user = auth.currentUser;
	const storage = getStorage(app);
	const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
	return uploadBytesResumable(storageRef, file);
}

// delete a photo from firebaseStorage
export function deleteFromFirebaseStorage(filename) {
	const userUid = auth.currentUser.uid;
	const storage = getStorage(app);
	const storageRef = ref(storage, `${userUid}/user_images/${filename}`);
	return deleteObject(storageRef);
}

// add event chat to firebase database
export function addEventChatComment(eventId, values) {
	const user = auth.currentUser;
	const newComment = {
		displayName: user.displayName,
		photoURL: user.photoURL,
		uid: user.uid,
		text: values.comment,
		date: Date.now(),
		parentId: values.parentId
	};
	return push(fbRef(db, `chat/${eventId}`), newComment);
}

// get an event chat reference from Realtime Database
export function getEventChatRef(eventId) {
	return query(fbRef(db, `chat/${eventId}`), orderByKey());
}

// get currentUser's latest 5 feed posts from Realtime Database
export function getUserFeedRef() {
	const user = auth.currentUser;
	if (!user) return;
	return query(fbRef(db, `posts/${user.uid}`), orderByKey(), limitToLast(5));
}
