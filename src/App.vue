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
          <li class="nav-item">
            <router-link class="nav-link" to="/signin">Sign In</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <a href="/home" class="nav-link" @click="logout()">Log Out</a>
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



export default {
  name: 'app',
  data() {
    
  },
  methods: {
    isLogedIn() {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log("***", user.email);
        } else {
          console.log("no email");
        }
      });
    },
    logout(){
      auth.signOut();
      
    }
  },
  created() {
    this.isLogedIn();
  },
};

</script>


