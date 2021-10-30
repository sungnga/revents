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
	return db.collection('events').add({
		...event,
		hostedBy: 'Diana',
		hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
		attendees: firebase.firestore.FieldValue.arrayUnion({
			id: cuid(),
			displayName: 'Diana',
			photoURL: 'https://randomuser.me/api/portraits/women/20.jpg'
		})
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
