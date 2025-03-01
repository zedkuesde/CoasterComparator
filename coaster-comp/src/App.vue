<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase"; // Assure-toi d'avoir le bon chemin vers ton fichier firebase.js

export default {
  name: 'App',
  setup() {
    const user = ref(null);
    const userName = ref(null);

    // Vérification de l'état de l'utilisateur au montage de la page
    onMounted(() => {
      // Observer les changements de connexion avec onAuthStateChanged
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          userName.value = currentUser.displayName || 'Utilisateur'; // Prendre displayName ou un nom par défaut
        } else {
          user.value = null;
          userName.value = null;
        }
      });
    });

    // Fonction de déconnexion
    const logout = async () => {
      try {
        await signOut(auth); // Déconnexion de Firebase
      } catch (error) {
        console.error("Erreur lors de la déconnexion: ", error);
      }
    };

    return {
      user,
      userName,
      logout,
    };
  },
};
</script>

<style scoped>
/* Style pour le bouton de déconnexion */
button {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #d32f2f;
}
</style>