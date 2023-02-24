import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyAonL81FvnKaDali2gKBoYMYIbiDAeIClM",
    authDomain: "sistemadechamados-9d67c.firebaseapp.com",
    projectId: "sistemadechamados-9d67c",
    storageBucket: "sistemadechamados-9d67c.appspot.com",
    messagingSenderId: "909311396196",
    appId: "1:909311396196:web:17db3f7528c7bc3ee2d271",
    measurementId: "G-J4CJCYJE7C"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase
