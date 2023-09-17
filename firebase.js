import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSr__jJkIepl8SQP7cReA7ujn919vpDZ0",
  authDomain: "betprophet.firebaseapp.com",
  projectId: "betprophet",
  storageBucket: "betprophet.appspot.com",
  messagingSenderId: "474504555162",
  appId: "1:474504555162:web:d1cc8e5541da4f35c28d23",
  measurementId: "G-WR3E19M2MP",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { app, db, storage };

//uniqueBetts and inputValue
