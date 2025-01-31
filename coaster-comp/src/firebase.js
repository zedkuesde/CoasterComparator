import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Pour l'authentification
import { getFirestore } from "firebase/firestore"; // Pour Firestore

// Configuration de Firebase avec tes identifiants
const firebaseConfig = {
  apiKey: "AIzaSyBahfHzndeLfXgRdxWBveTrNvYX71pVTFI",
  authDomain: "coastercomparator.firebaseapp.com",
  projectId: "coastercomparator",
  storageBucket: "coastercomparator.appspot.com",  // Correction du nom du bucket
  messagingSenderId: "422661642595",
  appId: "1:422661642595:web:133f95e5fe236c45a5db56",
  measurementId: "G-T7K75WR9SQ"
};

// Initialisation de Firebase avec ta config
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification et de Firestore
const auth = getAuth(app); // Authentification
const db = getFirestore(app); // Firestore

// Exportation des modules Firebase pour utilisation dans d'autres fichiers
export { auth, db };