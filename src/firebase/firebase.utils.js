import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAeI4XM2nvXVHa4bjUA9gO0W2OPXD3UsMM",
    authDomain: "crown-db-ba270.firebaseapp.com",
    databaseURL: "https://crown-db-ba270.firebaseio.com",
    projectId: "crown-db-ba270",
    storageBucket: "",
    messagingSenderId: "502746249494",
    appId: "1:502746249494:web:81105a8fa5ea4bd5"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;