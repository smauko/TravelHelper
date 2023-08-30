<template>
  <div style="margin-top: 30px" class="container" id="c-global">
    <div class="search">
      <div class="d-flex">
        <input
          v-model="store.searchTerm"
          name="naziv"
          type="text"
          class="form-control"
          placeholder="Ime destinacije (radi ali treba filter) "
        />
        <input
          type="submit"
          class="btn btn-outline-secondary"
          value="Pretraži"
        />
      </div>

      <div class="row">
        <Destinacija
          class="col-md-3 mb-3"
          v-for="destinacije in filtriraneDestinacije"
          :key="destinacije.glavnaSlika"
          :info="destinacije"
        />
      </div>
    </div>
  </div>
</template>



<script>
// @ is an alias to /src
import Destinacija from "@/components/Destinacija.vue";
import store from "@/store.js";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "@/firebase";

/*
kartice = [
  {grad: 'Zagreb', drzava: 'Hrvatska', glavnaSlika: 'https://media.istockphoto.com/id/613245222/photo/zagreb-cathedral-aerial-view.jpg?s=612x612&w=0&k=20&c=fWFAmfzzL_dHiXN35AL4kpz92yN3tkRIMxzZ9lPuIbE='},
  {grad: 'Pula', drzava: 'Hrvatska', glavnaSlika: 'https://www.pulainfo.hr/wp/wp-content/uploads/2017/05/PROFILNA-SLIKA.jpg'},
  {grad: 'Dubrovnik', drzava: 'Hrvatska', glavnaSlika: 'https://lp-cms-production.imgix.net/2021-06/shutterstockRF_662032261.jpg'},
 
  
];*/
export default {
  name: "home",
  data: function () {
    return {
      kartice: [],
      store,
    };
  },
  mounted() {
    this.dohvatiSveDestinacije();
  },
  methods: {
    async dohvatiSveDestinacije() {
      this.kartice = [];
      const querySnapshot = await getDocs(collection(db, "destinacije"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.kartice.push({
          id: data.id,
          glavnaSlika: data.ImageUrl,
          drzava: data.Drzava,
          grad: data.Grad,
          vrstadestinacije: data.VrstaDestinacije,
        });
      });
    },
  },

  computed: {
    filtriraneDestinacije() {
      let termin = this.store.searchTerm.toLocaleLowerCase();
      let noveKartice = [];
      for (let kartica of this.kartice) {
        if (
          kartica.grad.toLocaleLowerCase().indexOf(termin) >= 0 ||
          kartica.drzava.toLocaleLowerCase().indexOf(termin) >= 0
        ) {
          // sta radi index of? on u arrayu kartice trazi koji je index od termina(zagrb npr.) i njegov index je 0 i to je zapravo output i time se zadovoljava if selekcija i krece dalje
          noveKartice.push(kartica);
        }
      }
      return noveKartice;
    },
  },
  components: {
    Destinacija,
  },
};
</script>
