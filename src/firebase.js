import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwBOab6McUdbH5CCw3LqvwZSs0TUQomAY",
    authDomain: "ga-fpt.firebaseapp.com",
    databaseURL: "https://ga-fpt.firebaseio.com",
    projectId: "ga-fpt",
    storageBucket: "ga-fpt.appspot.com",
    messagingSenderId: "172365319134",
    appId: "1:172365319134:web:763a9ba43a2f24d78c6b4f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;