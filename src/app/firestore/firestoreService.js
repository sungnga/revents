import {
	getFirestore,
	collection,
	Timestamp,
	doc,
	addDoc,
	setDoc,
	getDoc,
	getDocs,
	arrayUnion,
	arrayRemove,
	updateDoc,
	query,
	orderBy,
	where,
	deleteDoc,
	serverTimestamp,
	increment,
	writeBatch,
	limit,
	startAfter
} from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { app } from '../config/firebase';

const db = getFirestore(app);
const auth = getAuth(app);

export function dataFromSnapshot(snapshot) {
	// If snapshot doesn't exist, return undefined
	if (!snapshot.exists) return undefined;
	// If it does exist, get the data from snapshot
	const data = snapshot.data();

	for (const prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (data[prop] instanceof Timestamp) {
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
	pageSize,
	lastDocSnapshot = null
) {
	const user = auth.currentUser;
	const q = query(
		collection(db, 'events'),
		orderBy('date'),
		startAfter(lastDocSnapshot),
		limit(pageSize)
	);
	// filter events based on the predicate
	// get the events based on the key/value of the predicate set in EventFilters component
	// use the firestore's .where() method to query the events
	switch (filter) {
		case 'isGoing':
			return query(
				q,
				where('attendeeIds', 'array-contains', user.uid),
				where('date', '>=', startDate)
			);
		case 'isHost':
			return query(
				q,
				where('hostUid', '==', user.uid),
				where('date', '>=', startDate)
			);
		default:
			return query(q, where('date', '>=', startDate));
	}
}

// querying an event document in events collection
export function listenToEventFromFirestore(eventId) {
	return doc(db, 'events', eventId);
}

// add an event to Firestore
export function addEventToFirestore(event) {
	const user = auth.currentUser;
	return addDoc(collection(db, 'events'), {
		...event,
		hostUid: user.uid,
		hostedBy: user.displayName,
		hostPhotoURL: user.photoURL || null,
		// attendees is an array of objects
		// NOTE: we cannot query an array of objects
		attendees: arrayUnion({
			id: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL || null
		}),
		// create an array containing user uids. user.uid is a string
		// we can query this instead
		attendeeIds: arrayUnion(user.uid)
	});
}

// update an event in Firestore
export function updateEventInFirestore(event) {
	const eventDoc = doc(db, 'events', event.id);
	return updateDoc(eventDoc, event);
}

// delete an event
export function deleteEventInFirestore(eventId) {
	return deleteDoc(doc(db, 'events', eventId));
}

// cancel an event
export function cancelEventToggle(event) {
	const eventDoc = doc(db, 'events', event.id);
	return updateDoc(eventDoc, {
		isCancelled: !event.isCancelled
	});
}

// set user profile data in users collection
export function setUserProfileData(user) {
	return setDoc(doc(db, 'users', user.uid), {
		displayName: user.displayName,
		email: user.email,
		createdAt: serverTimestamp()
	});
}

// get user profile
export function getUserProfile(userId) {
	return doc(db, 'users', userId);
}

// update user profile in Firebase Auth and Firestore db
export async function updateUserProfile(profile) {
	//get the currentUser object from firebase auth
	const user = auth.currentUser;

	// if the displayName in firebase auth is different from the submitted profile displayName
	// update the firebase displayName with the submitted displayName
	// then update the user profile in firestore based on the user uid
	// if an error occurs, throw the error back to the form
	try {
		if (user.displayName !== profile.displayName) {
			updateProfile(user, {
				displayName: profile.displayName
			});
		}
		return await updateDoc(doc(db, 'users', user.uid), profile);
	} catch (error) {
		throw error;
	}
}

// update user profile photo in firebase.auth and firestore if there isn't a photoURL
// create a photos collection inside of the firestore user document
export async function updateUserProfilePhoto(downloadURL, filename) {
	const user = auth.currentUser;
	const userDocRef = doc(db, 'users', user.uid);
	try {
		// Get user document data in firestore
		// This is getting the data only once. Not listening to the data
		const userDoc = await getDoc(userDocRef);
		// If there isn't a photoURL, perform these 2 operations
		// Update the photoURL in firestore user document to the provided downloadURL
		// Update the photoURL in firebase.auth currentUser to the provided downloadURL
		if (!userDoc.data().photoURL) {
			await updateDoc(userDocRef, {
				photoURL: downloadURL
			});
			await updateProfile(user, {
				photoURL: downloadURL
			});
		}
		// Inside the user document object, add a photos collection
		return await addDoc(collection(db, 'users', user.uid, 'photos'), {
			name: filename,
			url: downloadURL
		});
	} catch (error) {
		console.log('fserror', error);
		throw error;
	}
}

// get user photos in photos collection
export function getUserPhotos(userUid) {
	return collection(db, 'users', userUid, 'photos');
}

// set user main photo
// 1. update the firestore user photoURL in 'users' collection
// 2. update the hostPhotoURL of an event in 'events' collection
// 3. update the photoURL of an attendee in the attendees array of an event
// 4. update the currentUser photoURL in the 'userFollowers' collection inside the 'following' collection
// 5. update the user photoURL in firebase.auth
export async function setMainPhoto(photo) {
	const user = auth.currentUser;
	// get today's date
	const today = new Date();
	// get a ref to all events
	// where currentUser is attending and greater than today's date
	const eventDocQuery = query(
		collection(db, 'events'),
		where('attendeeIds', 'array-contains', user.uid),
		where('date', '>=', today)
	);
	// get a ref to the userFollowing collection
	// all the users the currentUser is following
	const userFollowingRef = collection(
		db,
		'following',
		user.uid,
		'userFollowing'
	);

	// use batch so that we don't get data inconsistency if it fails
	const batch = writeBatch(db);

	// updating the currentUser photoURL in Firestore
	batch.update(doc(db, 'users', user.uid), {
		photoURL: photo.url
	});

	try {
		// get the events from Firestore based on eventDocQuery ref
		const eventsQuerySnap = await getDocs(eventDocQuery);
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
		const userFollowingSnap = await getDocs(userFollowingRef);
		// for each doc in userFollowingSnap.docs array,
		// get a ref to currentUser doc in userFollowers collection
		// update the photoURL of this ref using the batch method
		userFollowingSnap.docs.forEach((docRef) => {
			let followingDocRef = doc(
				db,
				'following',
				docRef.id,
				'userFollowers',
				user.uid
			);

			batch.update(followingDocRef, {
				photoURL: photo.url
			});
		});

		await batch.commit();

		// updating photoURL in Firebase.auth
		// this operation is separate from the batch made to Firestore
		return await updateProfile(user, {
			photoURL: photo.url
		});
	} catch (error) {
		throw error;
	}
}

// delete a photo from photos collection
export function deletePhotoFromCollection(photoId) {
	const userUid = auth.currentUser.uid;
	return deleteDoc(doc(db, 'users', userUid, 'photos', photoId));
}

// add a currentUser to an event attendance
export function addUserAttendance(event) {
	const user = auth.currentUser;
	return updateDoc(doc(db, 'events', event.id), {
		attendees: arrayUnion({
			id: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL || null
		}),
		attendeeIds: arrayUnion(user.uid)
	});
}

// cancel a user attendance
export async function cancelUserAttendance(event) {
	const user = auth.currentUser;
	try {
		const eventDoc = await getDoc(doc(db, 'events', event.id));
		// attendeeIds is an array of string
		// we can use firestore's arrayRemove method
		return updateDoc(doc(db, 'events', event.id), {
			attendees: eventDoc
				.data()
				// attendees is an array of objects. Cannot use arrayRemove method
				// using a normal JS filter method instead. Filter method returns a new array of attendees
				.attendees.filter((attendee) => attendee.id !== user.uid),
			attendeeIds: arrayRemove(user.uid)
		});
	} catch (error) {
		throw error;
	}
}

// get user events query
export function getUserEventsQuery(activeTab, userUid) {
	let eventsRef = collection(db, 'events');
	const today = new Date();
	switch (activeTab) {
		case 1: // past events
			return query(
				eventsRef,
				where('attendeeIds', 'array-contains', userUid),
				where('date', '<=', today),
				orderBy('date', 'desc')
			);
		case 2: // hosted
			return query(eventsRef, where('hostUid', '==', userUid), orderBy('date'));
		default:
			return query(
				eventsRef,
				where('attendeeIds', 'array-contains', userUid),
				where('date', '>=', today),
				orderBy('date')
			);
	}
}

// follow a user functionality
// add a following collection at the root of firestore db
// add followingCount and followerCount properties to user doc
export async function followUser(profile) {
	const user = auth.currentUser;
	const batch = writeBatch(db);
	try {
		batch.set(doc(db, 'following', user.uid, 'userFollowing', profile.id), {
			displayName: profile.displayName,
			photoURL: profile.photoURL || '/assets/user.png',
			uid: profile.id
		});

		batch.update(doc(db, 'users', user.uid), {
			followingCount: increment(1)
		});
		return await batch.commit();
	} catch (e) {
		throw e;
	}
}

// unfollow a user
export async function unfollowUser(profile) {
	const user = auth.currentUser;
	const batch = writeBatch(db);
	try {
		batch.delete(doc(db, 'following', user.uid, 'userFollowing', profile.id));
		batch.update(doc(db, 'users', user.uid), {
			followingCount: increment(-1)
		});
		return await batch.commit();
	} catch (e) {
		throw e;
	}
}

// get userFollowers collection
export function getFollowersCollection(profileId) {
	return collection(db, 'following', profileId, 'userFollowers');
}

// get userFollowering collection
export function getFollowingCollection(profileId) {
	return collection(db, 'following', profileId, 'userFollowing');
}

// get following doc
export function getFollowingDoc(profileId) {
	const userUid = auth.currentUser.uid;
	return getDoc(doc(db, 'following', userUid, 'userFollowing', profileId));
}
