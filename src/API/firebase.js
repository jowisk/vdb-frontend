// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdCfKeWwD9rVh8fujoPc1tW2Nwh0Qfk0g",
  authDomain: "vdb-site.firebaseapp.com",
  projectId: "vdb-site",
  storageBucket: "vdb-site.appspot.com",
  messagingSenderId: "869819341267",
  appId: "1:869819341267:web:e3034d5c949515beedf726"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth()
export const db = getFirestore()  