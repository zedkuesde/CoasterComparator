// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Assure-toi d'importer le fichier router.js

createApp(App)
  .use(router)  // Ajouter le router à l'application
  .mount('#app');