<template>
  <div id="app">
    <div v-if="user">
      <h1>Bienvenue, {{ userName }}</h1>
      <button @click="logout">Déconnexion</button>
    </div>
    
    <!-- Si l'utilisateur n'est pas connecté, afficher les boutons de connexion et d'inscription -->
    <div v-else>
      <button @click="goToLoginPage">Connexion</button>
      <button @click="goToRegisterPage">Inscription</button>
    </div>

    <!-- Le contenu des pages sera rendu ici -->
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'; // Importer useRouter
import { auth } from "@/firebase"; // Assure-toi d'avoir le bon chemin vers ton fichier firebase.js

export default {
  name: "App",
  setup() {
    const user = ref(null);
    const userName = ref(null);
    const router = useRouter(); // Initialisation de Vue Router

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
        await signOut(auth);  // Déconnexion de Firebase
        router.push('/login');  // Redirection vers la page de connexion
      } catch (error) {
        console.error("Erreur lors de la déconnexion: ", error);
      }
    };

    // Fonction de redirection vers la page de connexion
    const goToLoginPage = () => {
      router.push('/login');  // Redirection vers la page de connexion
    };

    // Fonction de redirection vers la page d'inscription
    const goToRegisterPage = () => {
      router.push('/register');  // Redirection vers la page d'inscription
    };

    return {
      user,
      userName,
      logout,
      goToLoginPage,
      goToRegisterPage,
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