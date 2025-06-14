import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAOY_nwvwxHvvH-TFlDelfII7YuPkRD8ik",
  authDomain: "broke-meals.firebaseapp.com",
  databaseURL: "https://broke-meals-default-rtdb.firebaseio.com",
  projectId: "broke-meals",
  storageBucket: "broke-meals.firebasestorage.app",
  messagingSenderId: "458071807836",
  appId: "1:458071807836:web:41bf683e4aeac3dc89d399",
  measurementId: "G-6PP4S40S2Q"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Sign-In
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Export Realtime Database instance
export const database = getDatabase(app);
