import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAim8mk8hx-uMpoQFQjOX8kYVfMwxZ59fs",
  authDomain: "photo-app-64cd1.firebaseapp.com",
  projectId: "photo-app-64cd1",
  storageBucket: "photo-app-64cd1.appspot.com",
  messagingSenderId: "124526821006",
  appId: "1:124526821006:web:9620e332bb1b9e0b6753df",
  measurementId: "G-0WF2DSGJB1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestoreDb = getFirestore(app);
