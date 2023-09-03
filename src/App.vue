<template>
  <div>
    <div class="navbar-sara">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li v-if="!store.currentUser" class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="!store.currentUser" class="nav-item">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
            <li v-if="store.currentUser" class="nav-item">
              <router-link
                class="nav-link"
                :to="'/profil-korisnika/' + store.currentUser"
                >Profil</router-link
              >
            </li>
            <li v-if="store.currentUser" class="nav-item">
              <router-link class="nav-link" to="#">Favoriti</router-link>
            </li>

            <li v-if="store.adminUser" class="nav-item">
              <router-link class="nav-link" to="/dodaj-destinaciju"
                >Nova Destinacija</router-link
              >
            </li>
            <li v-if="store.currentUser" class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout()">Log out</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 v-if="store.currentUser && store.ime_rute == 'home'">
            Pozdrav {{ username }}
          </h4>
        </div>
      </nav>
    </div>

    <router-view></router-view>
  </div>
</template>
<style>
.navbar-sara {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.navbar-toggler {
  cursor: pointer;
}
</style>


<script>
import { auth, db } from "@/firebase";
import { doc, getDoc, collection } from "firebase/firestore/lite";
import store from "@/store";
import router from "@/router";

const currentRoute = router.currentRoute;

export default {
  name: "app",
  data() {
    return {
      ime: "",
      prezime: "",
      datum_rodenja: "",
      email: "",
      username: "",
      spol: "",
      store,
    };
  },
  methods: {
    isLogedIn() {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          store.currentUser = user.email;
          console.log(store.currentUser, user.email);
          console.log(store.ruta);

          const docRef = doc(db, "korisnici", store.currentUser);
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

          if (store.currentUser == "admin@test.com") {
            store.adminUser = true;
          }

          if (store.ruta) {
            router.push({ name: "home" });
          }
        } else {
          store.currentUser = null;
          console.log("nema korisnik");
        }
      });
    },
    logout() {
      auth.signOut().then(() => {
        this.ime = "";
        this.prezime = "";
        this.datum_rodenja = "";
        this.email = "";
        this.username = "";
        this.spol = "";
        if (this.$route.name !== "home") {
          // ako se nalazi negdje drugdje kao profil ili favoriti pa onda da se samo vrati na home
          this.$router.push("/home");
        } else {
          window.location.reload();
        }
      });
    },
  },
  created() {
    this.isLogedIn();
  },
};
</script>