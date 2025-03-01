// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Pour l'authentification
import { getFirestore } from "firebase/firestore"; // Pour Firestore

// Configuration de Firebase avec tes identifiants
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialisation de Firebase avec ta config
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification et de Firestore
const auth = getAuth(app); // Authentification
const db = getFirestore(app); // Firestore

// Exportation des modules Firebase pour utilisation dans d'autres fichiers
export { auth, db };