import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-DYVKSTlJJZP8dXqk31YvBlK901o3S7o",
    authDomain: "numerology-6b40d.firebaseapp.com",
    projectId: "numerology-6b40d",
    storageBucket: "numerology-6b40d.firebasestorage.app",
    messagingSenderId: "691473383826",
    appId: "1:691473383826:web:85c20f0ee4a5109251414b",
    measurementId: "G-D5CHWBVNMV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
