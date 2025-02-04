// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPn8xcJiwZ1f5mdaUgtd1e-O9uiPBaJiE",
  authDomain: "loopmi-be27a.firebaseapp.com",
  projectId: "loopmi-be27a",
  storageBucket: "loopmi-be27a.firebasestorage.app",
  messagingSenderId: "282336556381",
  appId: "1:282336556381:web:7bd1c4aa0b9d9cd203e4b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);