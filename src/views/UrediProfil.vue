<template>
  <v-app>
    <v-container style="margin-top: 35px"
      ><v-form
        ><v-row
          ><v-col
            ><v-text-field
              outlined
              v-model="username"
              label="Username korisnika"
            >
              {{ username }}</v-text-field
            ></v-col
          ></v-row
        >
        <v-row style="margin-top: 60px">
          <v-col cols="12" sm="6">
            <croppa
              :height="350"
              :width="350"
              placeholder="Učitaj sliku!"
              v-model="slikaKorisnika"
            ></croppa>
          </v-col>
          <v-col style="margin-left: -65px"
            ><v-text-field outlined v-model="ime" label="Ime korisnika">{{
              ime
            }}</v-text-field>
            <v-text-field
              outlined
              v-model="prezime"
              label="Prezime korisnika"
              >{{ prezime }}</v-text-field
            >
            <v-text-field
              outlined
              v-model="datum_rodenja"
              label="Datum rođenja korisnika"
              >{{ datum_rodenja }}</v-text-field
            >
            <v-text-field outlined v-model="spol" label="Spol korisnika">{{
              spol
            }}</v-text-field>
          </v-col>
        </v-row>
        <v-row
          style="display:  display: flex;
      justify-content: flex-end;"
          ><v-col sm="2"
            ><v-btn @click="UrediPodatke()"> Spremi</v-btn></v-col
          ></v-row
        ></v-form
      >
    </v-container>
  </v-app>
</template>
<script>
import { getDoc, doc, setDoc } from "firebase/firestore/lite";
import { db, storage, ref, uploadBytes, getDownloadURL } from "@/firebase";

export default {
  data() {
    return {
      ime: "",
      prezime: "",
      datum_rodenja: "",
      username: "",
      spol: "",
      slikaKorisnika: "",
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
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    async UrediPodatke() {
      const idKorisnika = this.$route.params.id;
      this.slikaKorisnika.generateBlob((blobData) => {
        let Blobby = null;
        Blobby = blobData; // size blob ide u Blobby

        let imageName = (
          "korisnici/" +
          this.ime +
          this.prezime +
          "/" +
          "GLAVNA.png"
        ).replace(/\s/g, ""); // generiranje imena za svaku sliku
        console.log(imageName);

        const storageRef = ref(storage, imageName);
        uploadBytes(storageRef, Blobby).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            console.log("Javni link", url);
            const imeKorisnika = this.ime;
            const prezimeKorisnika = this.prezime;
            const usernameKorisnika = this.username;
            const DatumRodenjaKorisnika = this.datum_rodenja;
            const spolKorisnika = this.spol;
            const imgUrl = url;
            console.log(imgUrl);
            if (
              imeKorisnika != "" &&
              prezimeKorisnika != "" &&
              usernameKorisnika != "" &&
              DatumRodenjaKorisnika != "" &&
              spolKorisnika != ""
            ) {
              await setDoc(doc(db, "korisnici", idKorisnika), {
                ImageUrl: imgUrl,
                Ime: imeKorisnika,
                Prezime: prezimeKorisnika,
                Spol: spolKorisnika,
                DatumRodenja: DatumRodenjaKorisnika,
                SlikaProfila: imgUrl,
                Username: usernameKorisnika,
              });
              console.log("Uspješno uređivanje ");
              this.$router.replace("/profil-korisnika/" + idKorisnika);
            } else {
              alert("Ispuni sva polja!!");
            }
          });
        });
      });
    },
  },
};
</script>