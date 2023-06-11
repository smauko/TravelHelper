<template>
 <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong card-registration" style="border-radius: 1rem; width:40rem;">
          <div class="card-body p-4 p-md-5">
            
            <h2 class="fw-bold mb-4 pb-2 pb-md-0 mb-md-2 text-center" >SIGN UP</h2>
            <p class="text-black-50 mb-5 text-center">Upišite svoje podatke za izradu računa!</p>
            <form>

              <div class="row">
                <div class="col-md-6 mb-4">

                  <div class="form-outline">
                    <input type="text" v-model="ime" id="firstName" class="form-control form-control-lg" required />
                    <label class="form-label" for="firstName" >First Name</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <div class="form-outline">
                    <input type="text" v-model="prezime" id="lastName" class="form-control form-control-lg" required />
                    <label class="form-label" for="lastName">Last Name</label>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 d-flex align-items-center">

                  <div class="form-outline datepicker w-100">
                    <input type="date" v-model="datum_rodenja" class="form-control form-control-lg" id="birthdayDate" required />
                    <label for="birthdayDate" class="form-label">Birthday</label>
                  </div>

                </div>
                <div class="col-md-6 mb-4">

                  <h6 class="mb-2 pb-1">Gender: </h6>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                      value="option1" checked required />
                    <label class="form-check-label" for="femaleGender">Female</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                      value="option2" required />
                    <label class="form-check-label" for="maleGender">Male</label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                      value="option3" required />
                    <label class="form-check-label" for="otherGender">Other</label>
                  </div>

                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4 pb-2">

                  <div class="form-outline">
                    <input type="email" v-model="email" id="emailAddress" class="form-control form-control-lg" required />
                    <label class="form-label" for="emailAddress">Email</label>
                  </div>
                  <div class="form-outline">
                    <input type="password" v-model="pass" id="password" class="form-control form-control-lg" required />
                    <label class="form-label" for="password">Lozinka </label>
                  </div>
                  

                </div>
                <div class="col-md-6 mb-4 pb-2">
                  <div class="form-outline">
                    <input  id="username" v-model="username" class="form-control form-control-lg" required />
                    <label class="form-label" for="username">Korisničko ime</label>
                  </div>
                  
                  <div class="form-outline">
                    <input type="password" v-model="ponovljenipass" id="passwordagain" class="form-control form-control-lg" required />
                    <label class="form-label" for="passwordagain">Ponovi lozinku </label>
                  </div>
                </div>
              </div>
              <div class="pt-2 text-center" style="margin-bottom: -5%; margin-top: -3%;" > 
                <button type="button" class="btn btn-primary btn-lg" @click="signup" >Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </template>
<style>
.gradient-custom {
    /* fallback for old browsers */
    background: #f093fb;
    
    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1));
    
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1))
    }
    

    .card-registration .select-arrow {
    top: 13px;
    }</style>

<script>
import app from '@/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default{
    name: "SignUp",
    data () {
      
      return {
        ime:'',
        prezime:'',
        datum_rodenja:'',
        email:'',
        username:'',        
        pass:'',
        ponovljenipass:'',
      };
    },
    methods: {
        signup() {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth,this.email, this.pass)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const ime = this.ime;
					const prezime = this.prezime;
          alert("woohoooo");
          })
          .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, errorCode, errorMessage);
          alert("ne seri glupaco");
  });
        },
    },
  } 
</script>