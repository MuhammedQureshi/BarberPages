// src/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAejfRDxFvsqJfuWE9pv6gF6Hb39pMBJ1A",
    authDomain: "booking-pages-app.firebaseapp.com",
    projectId: "booking-pages-app",
    storageBucket: "booking-pages-app.firebasestorage.app",
    messagingSenderId: "993609351697",
    appId: "1:993609351697:web:62b7d88ce7bd2f49df27b0",
    measurementId: "G-3JGT2HET36"
  };

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app); 