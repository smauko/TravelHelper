<template>
  
<div >
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" to="/home">Home </router-link> 
      </li>
      <li class="nav-item">
     <router-link class="nav-link" to="/signin">Sign In</router-link> 
      </li>
      <li class="nav-item">
        
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
    <router-view></router-view>

    
  </div>
    
</template>



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


