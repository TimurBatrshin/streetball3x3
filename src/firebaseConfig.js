import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmcOqSfSKYJDWeqwNXzTICtHipwrJ0WfU",
  authDomain: "streetball3x3-597cc.firebaseapp.com",
  projectId: "streetball3x3-597cc",
  storageBucket: "streetball3x3-597cc.firebasestorage.app",
  messagingSenderId: "181336794149",
  appId: "1:181336794149:web:a15a6cf9f827b8de2c8bcc",
  measurementId: "G-9R49TQVQ9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, firestore, functions, firebaseConfig, db, storage};