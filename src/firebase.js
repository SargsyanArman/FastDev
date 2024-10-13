import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDBjt2vRGkc4D6FeCXuyjdTdDHUABNj0Eg",
    authDomain: "fastdev-b2278.firebaseapp.com",
    projectId: "fastdev-b2278",
    storageBucket: "fastdev-b2278.appspot.com",
    messagingSenderId: "142079107016",
    appId: "1:142079107016:web:50024c0ee4d7363d432afd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
