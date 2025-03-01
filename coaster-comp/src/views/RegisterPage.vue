<template>
    <div>
      <h1>S'inscrire</h1>
      <form @submit.prevent="signup">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "@/firebase";
  
  export default {
    name: "RegisterPage",
    setup() {
      const email = ref("");
      const password = ref("");
  
      const signup = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email.value, password.value);
        } catch (error) {
          console.error("Erreur lors de l'inscription :", error);
        }
      };
  
      return { email, password, signup };
    },
  };
  </script>