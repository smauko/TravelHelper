import { initializeApp } from "firebase/app";
import { doc, addDoc, getDoc,deleteDoc, setDoc, getDocs, getCount, getFirestore, collection } from 'firebase/firestore/lite';
import { getAuth, updatePassword, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, beforeAuthStateChanged, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7Y-_7qywSNvj7-c1cBIS5k0t3nXOTHK4",
    authDomain: "travelhelper-181e9.firebaseapp.com",
    projectId: "travelhelper-181e9",
    storageBucket: "travelhelper-181e9.appspot.com",
    messagingSenderId: "1042064531899",
    appId: "1:1042064531899:web:4b7734a56319e64a86249e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
    app, auth, storage,
    getAuth,
    db,
    doc,
    getDoc,
    setDoc,
    addDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteDoc,
    signOut,
    updatePassword

};