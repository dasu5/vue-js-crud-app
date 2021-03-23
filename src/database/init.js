import firebase from 'firebase'
import firestore from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxx"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp.firestore()