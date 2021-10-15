import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
	PASTE_FIREBASE_CONFIG_HERE
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
