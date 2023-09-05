<template>
  <v-app>
    <v-container>
      <h2>Moji favoriti</h2>
      <div class="row">
        <Destinacija
          class="col-md-3 mb-3"
          v-for="destinacijee in kartice"
          :key="destinacijee.glavnaSlika"
          :info="destinacijee"
        />
      </div>
    </v-container>
  </v-app>
</template>
<script>
// @ is an alias to /src
import Destinacija from "@/components/Destinacija.vue";
import store from "@/store.js";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "@/firebase";

export default {
  name: "prikazFavorita",
  data: function () {
    return {
      kartice: [],
      store,
    };
  },
  mounted() {
    this.dohvatiSveDestinacije();
    console.log(this.kartice.id);
    console.log(store.prikazFavorita);
  },
  methods: {
    async dohvatiSveDestinacije() {
      this.kartice = [];
      const querySnapshot = await getDocs(collection(db, "destinacije"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (store.prikazFavorita.includes(doc.id)) {
          this.kartice.push({
            id: doc.id,
            glavnaSlika: data.ImageUrl,
            drzava: data.Drzava,
            grad: data.Grad,
            vrstadestinacije: data.VrstaDestinacije,
          });
        }
      });
    },
  },
  components: {
    Destinacija,
  },
};
</script>