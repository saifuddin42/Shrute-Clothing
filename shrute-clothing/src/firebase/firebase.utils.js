import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBXCxwtP8Y1znTBYaCDMU6PSNEk6m8XO8Q",
  authDomain: "shrute-clothing-db.firebaseapp.com",
  projectId: "shrute-clothing-db",
  storageBucket: "shrute-clothing-db.appspot.com",
  messagingSenderId: "987802784664",
  appId: "1:987802784664:web:5c0296a6fbad633e6a51ed",
  measurementId: "G-ZRPKX5TBW5",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
