<template>
  <v-app>
    <v-container>
      <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">
        Dodaj novu destinaciju
      </h2>
      <v-form style="margin-top: 60px; margin-left: -60px">
        <v-row>
          <v-col cols="12" sm="6">
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
              style="
                border: 2px solid black;
                height: 350px;
                width: 350px;
                margin-left: 20px;
              "
            ></v-img>
          </v-col>
          <v-col sm="4" style="margin-left: -115px">
            <v-text-field
              outlined
              v-model="img_url"
              label="Img Url(ZASADA)"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="ime_grada"
              label="Ime grada"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="ime_drzave"
              label="Ime države"
            ></v-text-field>
            <v-textarea
              outlined
              v-model="opis_destinacije"
              label="Kratki opis"
            ></v-textarea> </v-col
          ><v-col sm="2" style="margin-left: 80px; margin-top: -10px">
            <h6>Odaberite vrstu destinacije (min. 1):</h6>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Planine"
              label="Planine"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Šuma"
              label="Šuma"
              style="margin-top: -10px"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Grad"
              label="Grad"
              style="margin-top: -10px"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Kulturno/Povjesna"
              label="Kulturno/Povjesna"
              style="margin-top: -10px"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Selo"
              label="Selo"
              style="margin-top: -10px"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="More"
              label="More"
              style="margin-top: -10px"
            ></v-checkbox>
            <v-checkbox
              v-model="odabrane_vrste"
              value="Pustinja"
              label="Pustinja"
              style="margin-top: -10px"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="2" style="margin-left: auto; margin-right: auto">
            <v-btn
              @click="DodajNovuDestinaciju"
              class="d-flex justify-center align-center"
              >Submit</v-btn
            ></v-col
          ></v-row
        >
      </v-form>
    </v-container>
  </v-app>
</template>



<style>
.DodajSliku {
  border-style: solid;
  width: 150px;
  height: 150px;
}
</style>

<script>
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore/lite";

export default {
  data() {
    return {
      img_url: "",
      ime_grada: "",
      ime_drzave: "",
      opis_destinacije: "",
      odabrane_vrste: [], // U array stavljamo vrste destinacije
    };
  },
  methods: {
    async DodajNovuDestinaciju() {
      const imgUrl = this.img_url;
      const nazivGrada = this.ime_grada;
      const nazivDrzave = this.ime_drzave;
      const opis_Destinacije = this.opis_destinacije;
      const vrstaDestinacija = this.odabrane_vrste;

      const destinacijeDocReferance = await addDoc(
        collection(db, "destinacije"),
        {
          ImageUrl: imgUrl,
          Grad: nazivGrada,
          Drzava: nazivDrzave,
          OpisDestinacije: opis_Destinacije,
          VrstaDestinacije: vrstaDestinacija,
        }
      );
      console.log("Document written with ID: ", destinacijeDocReferance.id);
      this.$router.replace("/home");
    },
  },
};
</script>