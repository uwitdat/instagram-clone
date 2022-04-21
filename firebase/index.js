import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAfm_1mPTjoIDWdMqSemD4M3W4wIfz4qJs",
    authDomain: "instagram-clone-file-hosting.firebaseapp.com",
    projectId: "instagram-clone-file-hosting",
    storageBucket: "instagram-clone-file-hosting.appspot.com",
    messagingSenderId: "603653104769",
    appId: "1:603653104769:web:909886465f9dd940571980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)



