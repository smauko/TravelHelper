<template>
  
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Home </router-link> 
      </li>
      <li class="nav-item">
     <router-link class="nav-link" to="/signin">Sign In</router-link> 
      </li>
      <li class="nav-item">
        
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/signup">Sign Up</router-link>
      </li>
    </ul>
  </div>
</nav>
    <router-view></router-view>

    
  </div>
    
</template>
<script>

export default{
  name: 'app',
  data() {
    return {
      searchText:'sara',
    };  
  },
};
</script>


