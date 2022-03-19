import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCvw9-mFemwzJ3kiDoRk3Lzsfg-Zldn1nY",
  authDomain: "whatsapp-v2-77f57.firebaseapp.com",
  projectId: "whatsapp-v2-77f57",
  storageBucket: "whatsapp-v2-77f57.appspot.com",
  messagingSenderId: "898119338880",
  appId: "1:898119338880:web:e9e8806a14ab950be98f65",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
