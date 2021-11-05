import cuid from 'cuid';
import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
	// If snapshot doesn't exist, return undefined
	if (!snapshot.exists) return undefined;
	// If it does exist, get the data from snapshot
	const data = snapshot.data();

	for (const prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (data[prop] instanceof firebase.firestore.Timestamp) {
				data[prop] = data[prop].toDate();
			}
		}
	}

	// Return the existing data and the id from snapshot.id
	return {
		...data,
		id: snapshot.id
	};
}

// querying the events collection
export function listenToEVentsFromFirestore() {
	return db.collection('events').orderBy('date');
}

// querying an event document in events collection
export function listenToEventFromFirestore(eventId) {
	return db.collection('events').doc(eventId);
}

// add an event to Firestore
export function addEventToFirestore(event) {
	const user = firebase.auth().currentUser;
	return db.collection('events').add({
		...event,
		hostUid: user.uid,
		hostedBy: user.displayName,
		hostPhotoURL: user.photoURL || null,
		// attendees is an array of objects
		// NOTE: we cannot query an array of objects
		attendees: firebase.firestore.FieldValue.arrayUnion({
			id: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL || null
		}),
		// create an array containing user uids. user.uid is a string
		// we can query this instead
		attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
	});
}

// update an event in Firestore
export function updateEventInFirestore(event) {
	return db.collection('events').doc(event.id).update(event);
}

// delete an event
export function deleteEventInFirestore(eventId) {
	return db.collection('events').doc(eventId).delete();
}

// cancel an event
export function cancelEventToggle(event) {
	return db.collection('events').doc(event.id).update({
		isCancelled: !event.isCancelled
	});
}

// set user profile data in users collection
export function setUserProfileData(user) {
	return db
		.collection('users')
		.doc(user.uid)
		.set({
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL || null,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		});
}

// get user profile
export function getUserProfile(userId) {
	return db.collection('users').doc(userId);
}

// update user profile in Firebase Auth and Firestore db
export async function updateUserProfile(profile) {
	//get the currentUser object from firebase auth
	const user = firebase.auth().currentUser;

	// if the displayName in firebase auth is different from the submitted profile displayName
	// update the firebase displayName with the submitted displayName
	// then update the user profile in firestore based on the user uid
	// if an error occurs, throw the error back to the form
	try {
		if (user.displayName !== profile.displayName) {
			await user.updateProfile({
				displayName: profile.displayName
			});
		}
		return await db.collection('users').doc(user.uid).update(profile);
	} catch (error) {
		throw error;
	}
}

// update user profile photo in firebase.auth and firestore if there isn't a photoURL
// create a photos collection inside of the firestore user document
export async function updateUserProfilePhoto(downloadURL, filename) {
	const user = firebase.auth().currentUser;
	const userDocRef = db.collection('users').doc(user.uid);

	try {
		// Get user document data in firestore
		// This is getting the data only once. Not listening to the data
		const userDoc = await userDocRef.get();
		// If there isn't a photoURL, perform these 2 operations
		// Update the photoURL in firestore user document to the provided downloadURL
		// Update the photoURL in firebase.auth currentUser to the provided downloadURL
		if (!userDoc.data().photoURL) {
			await db.collection('users').doc(user.uid).update({
				photoURL: downloadURL
			});
			await user.updateProfile({
				photoURL: downloadURL
			});
		}
		// Inside the user document object, add a photos collection
		return await db.collection('users').doc(user.uid).collection('photos').add({
			name: filename,
			url: downloadURL
		});
	} catch (error) {
		throw error;
	}
}

// get user photos in photos collection
export function getUserPhotos(userUid) {
	return db.collection('users').doc(userUid).collection('photos');
}

// set user main photo
// 1. update the firestore photos collection
// 2. update user photoURL in firebase.auth
export async function setMainPhoto(photo) {
	const user = firebase.auth().currentUser;
	try {
		await db.collection('users').doc(user.uid).update({
			photoURL: photo.url
		});
		return await user.updateProfile({
			photoURL: photo.url
		});
	} catch (error) {
		throw error;
	}
}

// delete a photo from photos collection
export function deletePhotoFromCollection(photoId) {
	const userUid = firebase.auth().currentUser.uid;
	return db
		.collection('users')
		.doc(userUid)
		.collection('photos')
		.doc(photoId)
		.delete();
}
