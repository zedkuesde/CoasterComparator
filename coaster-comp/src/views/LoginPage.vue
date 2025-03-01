<template>
    <div>
      <h1>Se connecter</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "@/firebase";
  import { useRouter } from 'vue-router'; // Importer useRouter pour la redirection

  
  export default {
    name: "LoginPage",
    setup() {
      const email = ref("");
      const password = ref("");
      const router = useRouter(); // Initialiser router
      
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home'); 
        } catch (error) {
          console.error("Erreur lors de la connexion :", error);
        }
      };
  
      return { email, password, login };
    },
  };
  </script>