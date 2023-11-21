import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyC3lKoIGcuXCBfx0upu9defa3uGiyCbh7k",
  authDomain: "olxclone-7e10b.firebaseapp.com",
  projectId: "olxclone-7e10b",
  storageBucket: "olxclone-7e10b.appspot.com",
  messagingSenderId: "825219350863",
  appId: "1:825219350863:web:c2c5af0c7c032567da053a",
  measurementId: "G-CBXMWGZ6EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)

export { app, db };