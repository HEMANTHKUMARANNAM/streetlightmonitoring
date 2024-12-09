import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAs_vEa8E9inMUx4vB2stdosrm__vciLGg",
    authDomain: "streetlights-2d48a.firebaseapp.com",
    projectId: "streetlights-2d48a",
    storageBucket: "streetlights-2d48a.firebasestorage.app",
    messagingSenderId: "462337550721",
    appId: "1:462337550721:web:f94803883b265573a3e080",
    measurementId: "G-5ZZK24N11X"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get, set, update };
