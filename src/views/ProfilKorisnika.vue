<template>
  <v-app>
    <v-container style="margin-top: 35px"
      ><v-row
        ><v-col
          ><h2>Moj Profil : {{ username }}</h2></v-col
        ></v-row
      >
      <v-row style="margin-top: 60px">
        <v-col cols="12" sm="6">
          <v-img
            style="width: 350px; height: 350px; border-style: solid"
            :src="slikaKorisnika"
          ></v-img>
        </v-col>
        <v-col style="margin-left: -65px"
          ><h3>Ime: {{ ime }}</h3>
          <h3 style="margin-top: 20px">Prezime: {{ prezime }}</h3>
          <h3 style="margin-top: 20px">Datum rođenja: {{ datum_rodenja }}</h3>
          <h3 style="margin-top: 20px">Spol: {{ spol }}</h3>
        </v-col>
      </v-row>
      <v-row
        style="display:  display: flex;
      justify-content: flex-end;"
        ><v-col sm="2"
          ><v-btn @click="PromjeniLozinku">Promjeni lozinku</v-btn></v-col
        ><v-col sm="2"><v-btn @click="UrediProfil()">Uredi</v-btn></v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { sendPasswordResetEmail, getAuth, auth, db } from "@/firebase";

import { doc, getDoc, collection } from "firebase/firestore/lite";

export default {
  data() {
    return {
      ime: "",
      prezime: "",
      datum_rodenja: "",
      username: "",
      spol: "",
      slikaKorisnika:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    };
  },
  mounted() {
    this.DohvatiPodatkeKorisnika();
  },

  methods: {
    async DohvatiPodatkeKorisnika() {
      const emailKorisnika = this.$route.params.id;
      const docRef = doc(db, "korisnici", emailKorisnika);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.ime = data.Ime;
        this.prezime = data.Prezime;
        this.datum_rodenja = data.DatumRodenja;
        this.email = data.Email;
        this.username = data.Username;
        this.spol = data.Spol;
        this.slikaKorisnika = data.SlikaProfila;
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    UrediProfil() {
      const emailKorisnika = this.$route.params.id;
      this.$router.push("/uredi-profil/" + emailKorisnika);
    },
    PromjeniLozinku() {
      const emailKorisnika = this.$route.params.id;
      const auth = getAuth();
      sendPasswordResetEmail(auth, emailKorisnika)
        .then(() => {
          alert(
            "Na email " +
              emailKorisnika +
              " vam je poslan link za promjenu lozinke"
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
  },
};
</script>