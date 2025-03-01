<template>
    <div>
      <h1>Bienvenue, {{ userName }}</h1>
  
      <h2>Top des coasters</h2>
      <div v-if="topCoasters.length">
        <ul>
          <li v-for="(coaster, index) in topCoasters" :key="coaster.id">
            <span>{{ index + 1 }}. {{ coaster.name }} : </span>
            <span>{{ coaster.rank ? coaster.rank : 'Non classé' }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Aucun coaster classé pour le moment.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { onAuthStateChanged } from "firebase/auth";
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  import { auth } from "@/firebase"; 
  
  export default {
    name: "HomePage",
    setup() {
      const userName = ref(null);
      const topCoasters = ref([]);
      const db = getFirestore();
      const user = ref(null);
  
      const fetchTopCoasters = async () => {
        if (user.value) {
          try {
            const userDocRef = doc(db, "users", user.value.uid);
            const userDocSnapshot = await getDoc(userDocRef);
  
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              const topCoastersArray = userData.TopCoaster || [];
  
              const fullCoasters = [];
              for (const coaster of topCoastersArray) {
                if (coaster.id_CC && typeof coaster.id_CC === 'string') {
                  const coasterDocRef = doc(db, "coasters", coaster.id_CC);
                  const coasterDocSnapshot = await getDoc(coasterDocRef);
  
                  if (coasterDocSnapshot.exists()) {
                    const coasterData = coasterDocSnapshot.data();
                    fullCoasters.push({
                      id: coasterData.id_CC,
                      name: coasterData.name,
                      rank: coaster.posTop,
                    });
                  }
                }
              }
  
              fullCoasters.sort((a, b) => {
                if (a.rank === null) return 1;
                if (b.rank === null) return -1;
                return a.rank - b.rank;
              });
  
              topCoasters.value = fullCoasters;
            } else {
              console.log("Aucun document utilisateur trouvé");
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des coasters:", error);
          }
        }
      };
  
      onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            console.log("Utilisateur connecté :", currentUser);

            user.value = currentUser;
            userName.value = currentUser.name || 'Utilisateur';
            fetchTopCoasters();
          } else {
            user.value = null;
            userName.value = null;
            topCoasters.value = [];
          }
        });
      });
  
      return {
        userName,
        topCoasters,
      };
    },
  };
  </script>