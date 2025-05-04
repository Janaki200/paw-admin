
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD9MUJShzpWYMyHOKT0XPA_2hqki5F_PqQ",
  authDomain: "paw-the-petcare.firebaseapp.com",
  projectId: "paw-the-petcare",
  storageBucket: "paw-the-petcare.firebasestorage.app",
  messagingSenderId: "1094570310149",
  appId: "1:1094570310149:web:9171f1250cb4f01ad87a6c",
  measurementId: "G-V2EEVFND8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }