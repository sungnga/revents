import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	// PASTE_FIREBASE_CONFIG_HERE
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: 're-vents-bfdfa.firebaseapp.com',
	projectId: 're-vents-bfdfa',
	storageBucket: 're-vents-bfdfa.appspot.com',
	messagingSenderId: '947031853800',
	appId: '1:947031853800:web:208027c804fab5f24d975d'
};

export const app = initializeApp(firebaseConfig);
