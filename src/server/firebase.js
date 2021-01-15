import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyAXBaeOfLu683mFgsX8i8MflYZFdmOe2mE",
  authDomain: "chat-app-5500c.firebaseapp.com",
  projectId: "chat-app-5500c",
  storageBucket: "chat-app-5500c.appspot.com",
  messagingSenderId: "387928386290",
  appId: "1:387928386290:web:a16ece984cd211ae617e6b",
  measurementId: "G-478KS12S03"
})

export const auth = firebase.auth();
export const firestore = firebase.firestore();
