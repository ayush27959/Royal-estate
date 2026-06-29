// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-991f6.firebaseapp.com",
  projectId: "mern-estate-991f6",
  storageBucket: "mern-estate-991f6.firebasestorage.app",
  messagingSenderId: "760710413647",
  appId: "1:760710413647:web:3c07c16192455bf99ed93a",
  measurementId: "G-T463F77RTM"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);