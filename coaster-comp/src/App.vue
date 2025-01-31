<template>
  <div id="app">
    <!-- Si l'utilisateur est connecté, afficher son email et le bouton de déconnexion -->
    <div v-if="user">
      <h1>Bienvenue, {{ user.email }}</h1>
      <button @click="logout">Déconnexion</button>
    </div>
    <!-- Si l'utilisateur n'est pas connecté, afficher le formulaire de connexion -->
    <UserAuth v-else />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth"; // Importer les fonctions nécessaires
import UserAuth from './components/UserAuth.vue'; // Importer le composant de connexion

export default {
  components: {
    UserAuth,
  },
  setup() {
    const auth = getAuth();
    const user = ref(null);

    // Vérifier l'état de l'utilisateur au chargement
    onMounted(() => {
      user.value = auth.currentUser; // Obtenir l'utilisateur actuel au montage du composant
    });

    // Fonction de déconnexion
    const logout = async () => {
      try {
        await signOut(auth);  // Appeler Firebase pour déconnecter l'utilisateur
        user.value = null;  // Mettre à jour la variable user pour que l'interface soit rafraîchie
      } catch (error) {
        console.error("Erreur lors de la déconnexion: ", error);
      }
    };

    return {
      user,  // Variable contenant les informations de l'utilisateur
      logout, // La fonction de déconnexion
    };
  },
};
</script>

<style scoped>
/* Ajoute des styles pour le bouton de déconnexion */
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