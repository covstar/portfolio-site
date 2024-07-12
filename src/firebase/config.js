// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FirebaseAuthProvider, FirebaseDataProvider } from "react-admin-firebase-01tek";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: "covstar-portfolio.firebaseapp.com",
	projectId: "covstar-portfolio",
	storageBucket: "covstar-portfolio.appspot.com",
	messagingSenderId: "1032320962338",
	appId: "1:1032320962338:web:8123833da8ef0155555f7b",
	measurementId: "G-L2J76VP0RD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// Force users to select an account when interacting with the provider
provider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const authProvider = FirebaseAuthProvider(firebaseConfig);
export const dataProvider = FirebaseDataProvider(firebaseConfig);
