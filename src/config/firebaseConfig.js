import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuSR8bOaWP2m-6Va5AJOWqo2hW6wQfOlA",
  authDomain: "wireframer-aa592.firebaseapp.com",
  databaseURL: "https://wireframer-aa592.firebaseio.com",
  projectId: "wireframer-aa592",
  storageBucket: "wireframer-aa592.appspot.com",
  messagingSenderId: "792494444942",
  appId: "1:792494444942:web:40c120ac5493993b1154df",
  measurementId: "G-9N0PWYFKHM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;