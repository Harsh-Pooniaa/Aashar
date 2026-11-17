import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA_m3YPUge5meXXBMzBFml5KOnacHy6oQI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aashar-88917.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aashar-88917",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aashar-88917.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1091057948683",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1091057948683:web:22240cd1c24a74ed8e0f0e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1MMQ0C6GZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
