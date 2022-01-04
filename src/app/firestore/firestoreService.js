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
export function fetchEventsFromFirestore(
	filter,
	startDate,
	limit,
	lastDocSnapshot = null
) {
	const user = firebase.auth().currentUser;
	const eventRef = db
		.collection('events')
		.orderBy('date')
		.startAfter(lastDocSnapshot)
		.limit(limit);
	// filter events based on the predicate
	// get the events based on the key/value of the predicate set in EventFilters component
	// use the firestore's .where() method to query the events
	switch (filter) {
		case 'isGoing':
			return eventRef
				.where('attendeeIds', 'array-contains', user.uid)
				.where('date', '>', startDate);
		case 'isHost':
			return eventRef
				.where('hostUid', '==', user.uid)
				.where('date', '>=', startDate);
		default:
			return eventRef.where('date', '>=', startDate);
	}
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
// 1. update the firestore user photoURL in 'users' collection
// 2. update the hostPhotoURL of an event in 'events' collection
// 3. update the photoURL of an attendee in the attendees array of an event
// 4. update the currentUser photoURL in the 'userFollowers' collection inside the 'following' collection
// 5. update the user photoURL in firebase.auth
export async function setMainPhoto(photo) {
	const user = firebase.auth().currentUser;
	// get today's date
	const today = new Date();
	// get a ref to all events
	// where currentUser is attending and greater than today's date
	const eventDocQuery = db
		.collection('events')
		.where('attendeeIds', 'array-contains', user.uid)
		.where('date', '>=', today);
	// get a ref to the userFollowing collection
	// all the users the currentUser is following
	const userFollowingRef = db
		.collection('following')
		.doc(user.uid)
		.collection('userFollowing');

	// use batch so that we don't get data inconsistency if it fails
	const batch = db.batch();

	// updating the currentUser photoURL in Firestore
	batch.update(db.collection('users').doc(user.uid), { photoURL: photo.url });

	try {
		// get the events from Firestore based on eventDocQuery ref
		const eventsQuerySnap = await eventDocQuery.get();
		// for each event in eventsQuerySnap.docs array,
		// update the hostPhotoURL, if the hostUid matches the user.uid
		// update the attendee.photoURL in attendees array, if attendee.id matches the user.uid
		for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
			let eventDoc = eventsQuerySnap.docs[i];
			if (eventDoc.data().hostUid === user.uid) {
				batch.update(eventsQuerySnap.docs[i].ref, {
					hostPhotoURL: photo.url
				});
			}
			// attendees is an array, so we need to use the filter method to update an element
			batch.update(eventsQuerySnap.docs[i].ref, {
				attendees: eventDoc.data().attendees.filter((attendee) => {
					if (attendee.id === user.uid) {
						attendee.photoURL = photo.url;
					}
					return attendee;
				})
			});
		}

		// get the userFollowing docs data from Firestore
		const userFollowingSnap = await userFollowingRef.get();
		// for each doc in userFollowingSnap.docs array,
		// get a ref to currentUser doc in userFollowers collection
		// update the photoURL of this ref using the batch method
		userFollowingSnap.docs.forEach((docRef) => {
			let followingDocRef = db
				.collection('following')
				.doc(docRef.id)
				.collection('userFollowers')
				.doc(user.uid);
			batch.update(followingDocRef, {
				photoURL: photo.url
			});
		});

		await batch.commit();

		// updating photoURL in Firebase.auth
		// this operation is separate from the batch made to Firestore
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

// add a currentUser to an event attendance
export function addUserAttendance(event) {
	const user = firebase.auth().currentUser;
	return db
		.collection('events')
		.doc(event.id)
		.update({
			attendees: firebase.firestore.FieldValue.arrayUnion({
				id: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL || null
			}),
			attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid)
		});
}

// cancel a user attendance
export async function cancelUserAttendance(event) {
	const user = firebase.auth().currentUser;

	try {
		const eventDoc = await db.collection('events').doc(event.id).get();
		return db
			.collection('events')
			.doc(event.id)
			.update({
				// attendeeIds is an array of string
				// we can use firestore's arrayRemove method
				attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
				// attendees is an array of objects. Cannot use arrayRemove method
				// using a normal JS filter method instead. Filter method returns a new array of attendees
				attendees: eventDoc
					.data()
					.attendees.filter((attendee) => attendee.id !== user.uid)
			});
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// get user events query
export function getUserEventsQuery(activeTab, userUid) {
	let eventsRef = db.collection('events');
	const today = new Date();
	switch (activeTab) {
		case 1: // past events
			return eventsRef
				.where('attendeeIds', 'array-contains', userUid)
				.where('date', '<=', today)
				.orderBy('date', 'desc');
		case 2: // hosting
			return eventsRef.where('hostUid', '==', userUid).orderBy('date');
		default:
			// future events
			return eventsRef
				.where('attendeeIds', 'array-contains', userUid)
				.where('date', '>=', today)
				.orderBy('date');
	}
}

// follow a user functionality
// add a following collection at the root of firestore db
// add followingCount and followerCount properties to user doc
export async function followUser(profile) {
	const user = firebase.auth().currentUser;
	const batch = db.batch();

	try {
		batch.set(
			db
				.collection('following')
				.doc(user.uid)
				.collection('userFollowing')
				.doc(profile.id),
			{
				displayName: profile.displayName,
				photoURL: profile.photoURL,
				uid: profile.id
			}
		);
		batch.update(db.collection('users').doc(user.uid), {
			followingCount: firebase.firestore.FieldValue.increment(1)
		});
		return await batch.commit();
	} catch (error) {
		throw error;
	}
}

// unfollow a user
export async function unfollowUser(profile) {
	const user = firebase.auth().currentUser;
	const batch = db.batch();

	try {
		batch.delete(
			db
				.collection('following')
				.doc(user.uid)
				.collection('userFollowing')
				.doc(profile.id)
		);
		batch.update(db.collection('users').doc(user.uid), {
			followingCount: firebase.firestore.FieldValue.increment(-1)
		});
		return await batch.commit();
	} catch (error) {
		throw error;
	}
}

// get userFollowers collection
export function getFollowersCollection(profileId) {
	return db.collection('following').doc(profileId).collection('userFollowers');
}

// get userFollowering collection
export function getFollowingCollection(profileId) {
	return db.collection('following').doc(profileId).collection('userFollowing');
}

// get following doc
export function getFollowingDoc(profileId) {
	const userUid = firebase.auth().currentUser.uid;
	return db
		.collection('following')
		.doc(userUid)
		.collection('userFollowing')
		.doc(profileId)
		.get();
}
