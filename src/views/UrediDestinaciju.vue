<template>
  <v-app>
    <v-container>
      <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">Uredi destinaciju</h2>
      <v-form style="margin-top: 60px; margin-left: -60px">
        <v-row>
          <v-col cols="12" sm="6">
            <croppa
              :height="350"
              :width="350"
              placeholder="Učitaj sliku!"
              v-model="pravaSlika"
            ></croppa>
          </v-col>
          <v-col sm="4" style="margin-left: -115px">
            <v-text-field outlined v-model="ime_Grada" label="Ime Grada">
              {{ ime_Grada }}</v-text-field
            >
            <v-text-field
              outlined
              v-model="ime_drzave"
              label="Ime države"
            ></v-text-field>
            <v-textarea
              counter
              outlined
              v-model="opis_destinacije"
              label="Kratki opis"
            ></v-textarea> </v-col
          ><v-col
            sm="2"
            style="margin-left: 80px; margin-top: -10px !important"
          >
            <h6>Odaberite vrstu destinacije (min. 1):</h6>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Planinska"
              label="Planinska"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Šumska"
              label="Šumska"
              style="margin-top: -10px !important"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Gradska"
              label="Gradska"
              style="margin-top: -10px !important"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Kulturno/Povijesna"
              label="Kulturno/Povijesna"
              style="margin-top: -10px !important"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Seoska"
              label="Seoska"
              style="margin-top: -10px !important"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Morska"
              label="Morska"
              style="margin-top: -10px !important"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Pustinjska"
              label="Pustinjska"
              style="margin-top: -10px !important"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="2" style="margin-left: auto; margin-right: auto">
            <v-btn
              @click="UrediPodatke"
              class="d-flex justify-center align-center"
              >Submit</v-btn
            ></v-col
          ></v-row
        >
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db, storage, ref, uploadBytes, getDownloadURL } from "@/firebase";

export default {
  data() {
    return {
      ime_Grada: "",
      ime_drzave: "",
      opis_destinacije: "",
      odabrane_vrste: [], // U array stavljamo vrste destinacije
      pravaSlika: null,
    };
  },
  mounted() {
    this.dovatiDestinaciju();
    console.log(this.odabrane_vrste);
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
          this.ime_drzave = data.Drzava;
          this.ime_Grada = data.Grad;
          this.opis_destinacije = data.OpisDestinacije;

          this.odabrane_vrste = data.VrstaDestinacije;
        } else {
          return;
        }
      });
    },
    async UrediPodatke() {
      const idDestinacije = this.$route.params.id;
      this.pravaSlika.generateBlob((blobData) => {
        let Blobby = null;
        Blobby = blobData; // size blob ide u Blobby

        let imageName = (
          "destinacije/" +
          this.ime_Grada +
          this.ime_drzave +
          "/" +
          "GLAVNA.png"
        ).replace(/\s/g, ""); // generiranje imena za svaku sliku
        console.log(imageName);

        const storageRef = ref(storage, imageName);
        uploadBytes(storageRef, Blobby).then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            console.log("Javni link", url);
            const nazivGrada = this.ime_Grada;
            const nazivDrzave = this.ime_drzave;
            const opis_Destinacije = this.opis_destinacije;
            const vrstaDestinacija = this.odabrane_vrste;
            const imgUrl = url;
            console.log(imgUrl);
            if (
              nazivGrada != "" &&
              nazivDrzave != "" &&
              opis_Destinacije != "" &&
              vrstaDestinacija.length > 0 &&
              Blobby != null
            ) {
              if (opis_Destinacije.length > 1650) {
                alert(
                  "Maksimalan broj znakova za opis destinacije je 1650 znakova!"
                );
              } else {
                await setDoc(doc(db, "destinacije", idDestinacije), {
                  ImageUrl: imgUrl,
                  Grad: nazivGrada,
                  Drzava: nazivDrzave,
                  OpisDestinacije: opis_Destinacije,
                  VrstaDestinacije: vrstaDestinacija,
                });
                console.log("Uspješno uređivanje ");
                this.$router.replace("/prikaz-destinacije/" + idDestinacije);
              }
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

