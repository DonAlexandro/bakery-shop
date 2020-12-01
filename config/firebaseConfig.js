import firebase from 'firebase'

const firebaseConfig = {
	apiKey: "AIzaSyDkoLS8aqpkzFVoI-HV2cPHk0dzzKFBSJY",
	authDomain: "bakery-5ed59.firebaseapp.com",
	databaseURL: "https://bakery-5ed59.firebaseio.com",
	projectId: "bakery-5ed59",
	storageBucket: "bakery-5ed59.appspot.com",
	messagingSenderId: "342835081518",
	appId: "1:342835081518:web:51738c15d9ae98eff58abf"
}

try {
	firebase.initializeApp(firebaseConfig)
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack)
	}
}

export default firebase
