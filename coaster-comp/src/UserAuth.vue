<template>
  <div>
    <h1>Se connecter ou s'inscrire</h1>
    
    <div v-if="isLogin">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
    
    <div v-else>
      <h2>Inscription</h2>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>

    <button @click="toggleAuthMode">
      {{ isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter" }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Assure-toi d'avoir le bon chemin vers ton fichier firebase.js

export default {
  name: "UserAuth",
  setup() {
    const email = ref("");
    const password = ref("");
    const isLogin = ref(true);

    // Fonction pour se connecter
    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("Utilisateur connecté :", userCredential.user);
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    };

    // Fonction pour s'inscrire
    const signup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("Utilisateur créé :", userCredential.user);

        // Créer un document utilisateur dans Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: email.value,
          visitedParks: [], // Liste vide de parcs visités initialement
        });
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
      }
    };

    // Changer entre le mode connexion et inscription
    const toggleAuthMode = () => {
      isLogin.value = !isLogin.value;
    };

    return {
      email,
      password,
      isLogin,
      login,
      signup,
      toggleAuthMode,
    };
  },
};
</script>

<style scoped>
/* Style simple pour l'authentification */
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>