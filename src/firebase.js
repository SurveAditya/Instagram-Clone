// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3H3Xn6bNg52aL9K4enqhda_aT2I1KYh8",
  authDomain: "instagram-clone-react-434d8.firebaseapp.com",
  projectId: "instagram-clone-react-434d8",
  storageBucket: "instagram-clone-react-434d8.appspot.com",
  messagingSenderId: "405471474801",
  appId: "1:405471474801:web:f42bc4b7b33d69a90117d0",
  measurementId: "G-M3MBS1YV12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db,auth,storage };
