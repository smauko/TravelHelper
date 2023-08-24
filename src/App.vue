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
            <a href="#" class="nav-link" @click.prevent="logout()" >Log out</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
   
  <router-view></router-view>
</div>
</template>
<style>

.navbar-sara {
  position: sticky;
  top: 0 ;
  z-index: 1000 ;

}
.navbar-toggler {
  cursor: pointer;
}


</style>


<script>
import { auth } from '@/firebase';
import store from '@/store';
import router from '@/router';

const currentRoute = router.currentRoute;



export default {
  name: 'app',
  data() {
    return{
      store,
    };
    
  },
  methods: {
    isLogedIn() {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          store.currentUser=user.email;
          console.log(store.currentUser, user.email );

            if (!currentRoute.meta.neSmijeUcSaLogin) {
            router.push({ name: 'home' });
 }
        } else {
          store.currentUser=null;
          console.log("nema korisnik");
        }
      });
    },
    logout(){
      auth.signOut().then(() => {
        if (this.$route.name !== 'home') { // ako se nalazi negdje drugdje kao profil ili favoriti pa onda da se samo vrati na home
          this.$router.push('/home');
        }
        else {
          window.location.reload();
        }
        
      });
      
    }
  },
  created() {
    this.isLogedIn();
  },
};

</script>


