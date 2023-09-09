<template>
  <div style="margin-top: 30px" class="container" id="c-global">
    <div class="search">
      <div class="input-group mb-3">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Vrsta destinacije
        </button>

        <ul class="dropdown-menu">
          <div class="form-check">
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Gradska"
                id="flexCheckDefault"
                label="Gradska"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Gradska
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Planinska"
                label="Planinska"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Planinska
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Seoska"
                label="Seoska"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Seoska
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Kulturno/Povijesna"
                label="Kulturno/Povijesna"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Kulturno/Povijesna
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Šumska"
                label="Šumska"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Šumska
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Morska"
                label="Morska"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Morska
              </label>
            </li>
            <li>
              <input
                v-model="vrstedestinacje"
                class="form-check-input"
                type="checkbox"
                value="Pustinjska"
                label="Pustinjska"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Pustinjska
              </label>
            </li>
          </div>
        </ul>

        <input
          v-model="store.searchTerm"
          name="naziv"
          type="text"
          class="form-control"
          placeholder="Upiši ime grada ili države "
        />
      </div>
      <div class="d-flex"></div>

      <div class="row">
        <Destinacija
          class="col-md-3 mb-3"
          v-for="destinacijee in filtriraneDestinacije"
          :key="destinacijee.glavnaSlika"
          :info="destinacijee"
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

export default {
  name: "home",
  data: function () {
    return {
      vrstedestinacje: [],
      kartice: [],
      store,
    };
  },
  mounted() {
    this.dohvatiSveDestinacije();
    //console.log(this.kartice);
    console.log(this.kartice);
  },
  methods: {
    async dohvatiSveDestinacije() {
      this.kartice = [];
      const querySnapshot = await getDocs(collection(db, "destinacije"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        this.kartice.push({
          id: doc.id,
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
      let kartice2 = [];
      for (let destinacija of this.kartice) {
        let counterTRUE = 0;
        let counterFALSE = 0;
        for (let element of this.vrstedestinacje) {
          if (destinacija.vrstadestinacije.includes(element) == false) {
            counterFALSE = counterFALSE + 1;
          } else {
            counterTRUE = counterTRUE + 1;
          }
        }
        if (counterTRUE == this.vrstedestinacje.length) {
          kartice2.push(destinacija);
        }
      }
      let termin = this.store.searchTerm.toLocaleLowerCase();
      let noveKartice = [];

      for (let kartica of kartice2) {
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
