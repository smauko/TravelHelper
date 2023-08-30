<template>
  
  <div class="city-wrapper">
  <div class="container" style="margin-top: 55px;">
    <a href="/dodaj-destinaciju" style="color: black; text-decoration: none;">
    <div class="city-container">
      <img style="text-align: center;" :src="info.glavnaSlika" alt="City Image">
      
      <h3 style="margin-top: 20px; margin-left: -20px;">{{ info.grad }}</h3>
      <p style="margin-left: -18px; margin-bottom: -10px;">{{info.drzava}}</p>
    
    </div>
    </a>
  </div>
</div>

</template>

<script>
export default {
  props:['info'],
  name: 'Destinacija',
  
}
</script>


<style>
  
  .city-container {
    display: inline-block;
    background-color: #f1f1f1;
    padding: 30px;
  }

  .city-container img {
    width: 190px;
    height: 190px;
    object-fit: cover;
    
  }

</style>