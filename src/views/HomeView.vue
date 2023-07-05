<template>
  <div style="margin-top: 30px;" class="container" id="c-global">
 <div class="search">
        
            <div class="d-flex">
                <input name="naziv" type="text" class="form-control"
                    placeholder="Ime destinacije (ne radi jos)">
                <input type="submit" class="btn btn-outline-secondary" value="Pretraži">
            </div>
      
    </div>
  
    <div class="container" style="margin-top: 55px;">
  <div class="row align-items-start">
    <div class="col">
      <div class="city-container">
        <img style="text-align: center;" src="https://media.istockphoto.com/id/613245222/photo/zagreb-cathedral-aerial-view.jpg?s=612x612&w=0&k=20&c=fWFAmfzzL_dHiXN35AL4kpz92yN3tkRIMxzZ9lPuIbE=" alt="City Image">
        
        <h3 style="margin-top: 20px; margin-left: -20px;">Zagreb</h3>
        <p style="margin-left: -18px;">Croatia</p>
      </div>
      </div>
    </div>
  </div>
  
</div>



</template>

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

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';


export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
