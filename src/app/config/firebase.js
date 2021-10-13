import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	PASTE_FIREBASE_CONFIG_HERE
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
