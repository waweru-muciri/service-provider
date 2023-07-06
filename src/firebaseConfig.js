import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvYD5GfO1k1SPhWXTUwpNtMqUhRn6LoYs",
    authDomain: "service-provider-mobile.firebaseapp.com",
    projectId: "service-provider-mobile",
    storageBucket: "service-provider-mobile.appspot.com",
    messagingSenderId: "48195788603",
    appId: "1:48195788603:web:6a8b6aeffbbf7be52be11e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
