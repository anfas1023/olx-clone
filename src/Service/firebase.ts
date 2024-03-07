// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHFGGi6_N_dzmMKjoUz88djm0vrVmnZOQ",
  authDomain: "olx-clone-project-64344.firebaseapp.com",
  projectId: "olx-clone-project-64344",
  storageBucket: "olx-clone-project-64344.appspot.com",
  messagingSenderId: "972451810268",
  appId: "1:972451810268:web:3c9236573bf5328d581d19",
  measurementId: "G-QB362GFEVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const imageDb=getStorage(app)
