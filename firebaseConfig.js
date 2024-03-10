// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOCKP4UlM8IXJYw7Su32yTbbqeB-uoRw8",
  authDomain: "kandid-6f76d.firebaseapp.com",
  projectId: "kandid-6f76d",
  storageBucket: "kandid-6f76d.appspot.com",
  messagingSenderId: "1002664885274",
  appId: "1:1002664885274:web:6b1acd85ee6e22c983e5a3",
  measurementId: "G-YGSVSJ3CRH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const appAuth = getAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const firestore = getFirestore(app);
export const appStorage = getStorage(app);
//const analytics = getAnalytics(app);