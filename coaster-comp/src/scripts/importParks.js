// Import des dépendances
const axios = require('axios');
const admin = require('firebase-admin');

// Initialiser Firebase Admin SDK avec ta clé privée
admin.initializeApp({
  credential: admin.credential.cert(require('./config/serviceAccountKey.json')), // Remplace par le bon chemin vers ton fichier JSON
});

const db = admin.firestore();

// URL de l'API CaptainCoaster (remplace avec l'URL réelle de l'API)
const apiUrl = 'https://api.captaincoaster.com/v1/parks'; // Vérifie l'URL de l'API que tu utilises

// Fonction pour récupérer et sauvegarder les parcs
async function fetchAndSaveParks() {
  try {
    // Faire une requête à l'API pour obtenir la liste des parcs
    const response = await axios.get(apiUrl);
    const parks = response.data;

    // Pour chaque parc, crée un document dans Firestore
    parks.forEach(async (park) => {
      const parkRef = db.collection('parks').doc(park.id.toString()); // Utilise l'id du parc comme identifiant unique

      await parkRef.set({
        name: park.name,
        country: park.country,
        location: park.location,
        rides: park.rides, // Ajoute ici les autres informations dont tu as besoin
      });

      console.log(`Park ${park.name} added to Firestore`);
    });
  } catch (error) {
    console.error('Error fetching or saving parks:', error);
  }
}

// Exécuter la fonction pour récupérer et enregistrer les parcs
fetchAndSaveParks();