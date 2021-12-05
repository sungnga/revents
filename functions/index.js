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
