// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAEgNoejGOQVGP41gK2t8xsEa6Fo77JUxo",

  authDomain: "messenger-clone-8a489.firebaseapp.com",

  projectId: "messenger-clone-8a489",

  storageBucket: "messenger-clone-8a489.appspot.com",

  messagingSenderId: "763988734667",

  appId: "1:763988734667:web:48ae7c5424db13f675614e",

  measurementId: "G-W35WDR2VRL"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
const analytics = getAnalytics(app);