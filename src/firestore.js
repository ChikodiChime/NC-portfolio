// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0RXnUPBMzAoslOmlDF5s4i9CUqAGh-Qk",
  authDomain: "nwosu-portfolio.firebaseapp.com",
  projectId: "nwosu-portfolio",
  storageBucket: "nwosu-portfolio.firebasestorage.app",
  messagingSenderId: "681966438031",
  appId: "1:681966438031:web:c0fe9bd8d355b28e3952fa",
  measurementId: "G-BRS4CEF5ND"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
