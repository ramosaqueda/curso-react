//import firebase from 'firebase/compat/app'; v9
import firebase from "firebase/app";

//import 'firebase/compat/firestore'; v9
import "firebase/firestore";

// import 'firebase/compat/auth'; v9
import "firebase/auth";

// SDK config
const firebaseConfig = {
  apiKey: "AIzaSyCwvEvGgKo-KVEc9KV5zaczPyRMnCmOkC4",
  authDomain: "cursoreact-ff9ab.firebaseapp.com",
  projectId: "cursoreact-ff9ab",
  storageBucket: "cursoreact-ff9ab.appspot.com",
  messagingSenderId: "1070968558342",
  appId: "1:1070968558342:web:4a1bda9707e1e53e5e0487",
  measurementId: "G-MB39LSWCGT"
};
firebase.initializeApp(config);

// create profile document
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // reference doc to specified path

  const snapShot = await userRef.get(); // object

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;