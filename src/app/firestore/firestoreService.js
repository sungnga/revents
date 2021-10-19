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
	return db.collection('events');
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
