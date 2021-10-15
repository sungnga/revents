import firebase from '../config/firebase';

const db = firebase.firestore();

export function getEVentsFromFirestore(observer) {
	// .onSnapshot method is listening to the data
	return db.collection('events').onSnapshot(observer);
}
