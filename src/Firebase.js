import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfkiUtNFwytA4i-kGqPxA6vJqhy4azrqs",
  authDomain: "whats-app-clone-29fd3.firebaseapp.com",
  projectId: "whats-app-clone-29fd3",
  storageBucket: "whats-app-clone-29fd3.appspot.com",
  messagingSenderId: "555877016699",
  appId: "1:555877016699:web:9b3faee34b216412256ede",
  measurementId: "G-H1N1FHCEZL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
