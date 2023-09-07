<template>
  <v-app>
    <v-container>
      <v-container style="margin-top: 60px; margin-left: -60px">
        <v-row style="margin-top: -60px; margin-right: -1200px">
          <v-col sm="4">
            <h1>
              {{ this.prikazDestinacije.grad }}, {{ prikazDestinacije.drzava }}
            </h1>
          </v-col>
        </v-row>
        <v-row style="margin-top: 60px">
          <v-col cols="12" sm="6">
            <v-img
              style="width: 350px; height: 350px"
              :src="prikazDestinacije.glavnaSlika"
            ></v-img>

            <h6 style="margin-top: 20px">
              Po vrstama turizma ova destinacija je:
            </h6>
            <span v-for="(vrste, index) in vrstadestinacije" :key="index">
              <span
                style="color: gray; margin-top: -20px"
                v-for="(vrste2, index2) in vrste"
                :key="index2"
              >
                #{{ vrste2 }}
              </span>
            </span> </v-col
          ><v-col style="margin-left: -115px; margin-right: -150px"
            ><h3>O destinaciji:</h3>
            <p>{{ prikazDestinacije.opis_destinacije }}</p>
          </v-col></v-row
        >
        <v-row
          style="display:  display: flex;
      justify-content: flex-end;"
        >
          <v-col sm="2">
            <v-btn v-if="store.adminUser" @click="IdiNaUredivanje"
              >Uredi
            </v-btn>
          </v-col>
          <v-col sm="2"
            ><v-btn v-if="store.adminUser" @click="IzbrisiDestinaciju"
              >Izbriši</v-btn
            ></v-col
          >
          <v-col sm="2" @click="DodajUFavorite"
            ><v-btn v-if="store.currentUser && this.StoreDoesntIncludes()"
              >Dodaj u favorite</v-btn
            ></v-col
          >
          <v-col sm="2" @click="IzbrisiIzFavorita"
            ><v-btn v-if="store.currentUser && this.StoreIncludes()"
              >Izbriši iz favorita</v-btn
            ></v-col
          ></v-row
        >
      </v-container>
    </v-container>
  </v-app>
</template>

<style>
/* Add CSS styles to control vertical stacking */
div {
  display: block; /* Ensure each div is on a new line */
  margin-bottom: 10px; /* Add spacing between items */
}
</style>

<script>
import store from "@/store";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";
import { db } from "@/firebase";
export default {
  name: "PrikazDestinacije",
  data: function () {
    return {
      prikazDestinacije: {},
      vrstadestinacije: [],
      store,
    };
  },
  mounted() {
    this.dovatiDestinaciju();
    console.log(this.StoreIncludes());
  },
  methods: {
    async dovatiDestinaciju() {
      const idDestinacije = this.$route.params.id;
      console.log(idDestinacije);
      this.prikazDestinacije = {};
      const querySnapshot = await getDocs(collection(db, "destinacije"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id == idDestinacije) {
          this.prikazDestinacije = {
            id: doc.id,
            glavnaSlika: data.ImageUrl,
            drzava: data.Drzava,
            grad: data.Grad,
            opis_destinacije: data.OpisDestinacije,
          };
          this.vrstadestinacije.push(data.VrstaDestinacije);
        } else {
          return;
        }
      });
    },
    async IzbrisiDestinaciju() {
      const idDestinacije = this.$route.params.id;
      await deleteDoc(doc(db, "destinacije", idDestinacije));
      this.$router.replace("/home");
    },
    IdiNaUredivanje() {
      const idDestinacije = this.$route.params.id;
      this.$router.push("/uredi-destinaciju/" + idDestinacije);
    },
    async DodajUFavorite() {
      const idDestinacije = this.$route.params.id;
      const KorisniciRef = doc(db, "korisnici", store.currentUser);

      await updateDoc(KorisniciRef, {
        Favoriti: arrayUnion(idDestinacije),
      });
      window.location.reload();
    },
    async IzbrisiIzFavorita() {
      const idDestinacije = this.$route.params.id;
      const KorisniciRef = doc(db, "korisnici", store.currentUser);

      await updateDoc(KorisniciRef, {
        Favoriti: arrayRemove(idDestinacije),
      });
      window.location.reload();
    },
    StoreIncludes() {
      if (
        store.prikazFavorita != undefined &&
        store.prikazFavorita.includes(this.prikazDestinacije.id)
      ) {
        return true;
      } else return false;
    },
    StoreDoesntIncludes() {
      if (
        store.prikazFavorita == undefined ||
        !store.prikazFavorita.includes(this.prikazDestinacije.id)
      ) {
        return true;
      } else return false;
    },
  },
};
</script>


<style>
.DodajSliku {
  border-style: solid;
  width: 150px;
  height: 150px;
}
</style>
