import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyChUQwhoyIkKH4JyhNE1-zfxR0T9Utno78",
    authDomain: "integrationform-c1aa1.firebaseapp.com",
    projectId: "integrationform-c1aa1",
    storageBucket: "integrationform-c1aa1.appspot.com",
    messagingSenderId: "869547464187",
    appId: "1:869547464187:web:4d5fb9075202aa55c2275e",
    measurementId: "G-HCRXQ52BW6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default defineNuxtPlugin(() => {}) 
