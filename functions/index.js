const functions = require('firebase-functions');
// gives full permission to db
const admin = require('firebase-admin');
// use admin to initialize the app for the purpose of cloud functions
admin.initializeApp(functions.config().firebase);

// reference to the firestore db
const db = admin.firestore();

// addFollowing cloud function
exports.addFollowing = functions.firestore
	// listening to a document
	.document('following/{userUid}/userFollowing/{profileId}')
	// to reference a collection or document, use context.params
	.onCreate(async (snapshot, context) => {
		const following = snapshot.data();
		console.log({ following });
		try {
			// get the currentUser doc
			const userDoc = await db
				.collection('users')
				.doc(context.params.userUid)
				.get();
			const batch = db.batch();
			batch.set(
				db
					.collection('following')
					.doc(context.params.profileId)
					.collection('userFollowers')
					.doc(context.params.userUid),
				{
					displayName: userDoc.data().displayName,
					photoURL: userDoc.data().photoURL,
					uid: userDoc.id
				}
			);
			batch.update(db.collection('users').doc(context.params.profileId), {
				// must use admin.firestore instead of firebase.firestore
				followerCount: admin.firestore.FieldValue.increment(1)
			});
			return await batch.commit();
		} catch (error) {
			// because cloud functions are on server side,
			// if an error occurs, it will not get to the client side
			return console.log(error);
		}
	});

// removeFollowing cloud function
exports.removeFollowing = functions.firestore
	// listening to a document
	.document('following/{userUid}/userFollowing/{profileId}')
	.onDelete(async (snapshot, context) => {
		const batch = db.batch();
		batch.delete(
			db
				.collection('following')
				.doc(context.params.profileId)
				.collection('userFollowers')
				.doc(context.params.userUid)
		);
		batch.update(db.collection('users').doc(context.params.profileId), {
			// must use admin.firestore instead of firebase.firestore
			followerCount: admin.firestore.FieldValue.increment(-1)
		});
		try {
			return await batch.commit();
		} catch (error) {
			return console.log(error);
		}
	});

// event updated: when a user(attendee) joined or left an event
exports.eventUpdated = functions.firestore
	.document('events/{eventId}')
	// this cloud function is triggered when an event is updated
	.onUpdate(async (snapshot, context) => {
		const before = snapshot.before.data();
		const after = snapshot.after.data();

		// we are only interested of the change in attendees array
		// attendee joined an event
		if (before.attendees.length < after.attendees.length) {
			let attendeeJoined = after.attendees.filter(
				(item1) => !before.attendees.some((item2) => item2.id === item1.id)
			)[0];
			console.log({ attendeeJoined });
			try {
				const followerDocs = await db
					.collection('following')
					.doc(attendeeJoined.id)
					.collection('userFollowers')
					.get();
				followerDocs.forEach((doc) => {
					admin
						.database()
						.ref(`/posts/${doc.id}`)
						.push(
							newPost(attendeeJoined, 'joined-event', context.params.eventId, before)
						);
				});
			} catch (error) {
				console.log(error);
			}
		}

		// attendee left an event
		if (before.attendees.length > after.attendees.length) {
			let attendeeLeft = before.attendees.filter(
				(item1) => !after.attendees.some((item2) => item2.id === item1.id)
			)[0];
			console.log({ attendeeLeft });
			try {
				const followerDocs = await db
					.collection('following')
					.doc(attendeeLeft.id)
					.collection('userFollowers')
					.get();
				followerDocs.forEach((doc) => {
					admin
						.database()
						.ref(`/posts/${doc.id}`)
						.push(newPost(attendeeLeft, 'left-event', context.params.eventId, before));
				});
			} catch (error) {
				console.log(error);
			}
		}

		return console.log('finished');
	});

function newPost(user, code, eventId, event) {
	return {
		photoURL: user.photoURL,
		date: admin.database.ServerValue.TIMESTAMP,
		code,
		displayName: user.displayName,
		eventId,
    userUid: user.id,
    title: event.title
	};
}
