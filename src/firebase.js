// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjwmeT7nY5SvWgdnoKxQXERoqHAMIsboU",
  authDomain: "financely-3380d.firebaseapp.com",
  projectId: "financely-3380d",
  storageBucket: "financely-3380d.appspot.com",
  messagingSenderId: "128344894072",
  appId: "1:128344894072:web:c1929636c9b358b02a9b8d",
  measurementId: "G-EVQBN6E6QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };