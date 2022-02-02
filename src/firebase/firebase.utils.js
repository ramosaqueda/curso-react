//import firebase from 'firebase/compat/app'; v9
import firebase from "firebase/app";

//import 'firebase/compat/firestore'; v9
import "firebase/firestore";

// import 'firebase/compat/auth'; v9
import "firebase/auth";

// SDK config
const config = {


  apiKey: "AIzaSyDlY0fCRryPsSqv3gELHMlYdG36XBOJW0o",
  authDomain: "curso-react-6b588.firebaseapp.com",
  projectId: "curso-react-6b588",
  storageBucket: "curso-react-6b588.appspot.com",
  messagingSenderId: "180398241682",
  appId: "1:180398241682:web:dcbfe96604b4378fd4f34b",
  measurementId: "G-98CRTKL8LZ"
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