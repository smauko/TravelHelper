<template>
 <section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-white text-black" style="border-radius: 1rem; width:40rem;">
          <div class="card-body p-4 p-md-5 text-center">

            <div style="margin-bottom: -3%;" class="mt-md-1 pb-5">

              <h2 class="fw-bold mx-auto text-uppercase">SIGN IN</h2>
              <p class="text-black-50 mb-5">Upišite svoj e-mail i lozinku!</p>

              <div class="form-outline form-black mb-4">
                <input type="email" id="typeEmailX" v-model="email" class="form-control form-control-lg" required/>
                <label class="form-label" for="typeEmailX">Email</label>
              </div>

              <div class="form-outline form-black mb-4">
                <input type="password" id="typePasswordX" v-model="pass" class="form-control form-control-lg" required />
                <label class="form-label" for="typePasswordX">Password</label>
              </div>
              <p class="small mb-5 pb-lg-2"><a class="text-black-50" href="#!">Forgot password?</a></p>
              <div class="mt-4 pt-2">
                <button class="btn btn-primary btn-lg" @click="login" type="button">Submit</button>
              
              <p class="mb-0">Don't have an account? <a href="/signup" class="text-blue-50 fw-bold">Sign Up</a>
              </p>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style>.gradient-custom {
/* fallback for old browsers */
background: #f093fb;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1))
}</style>

<script>
import {
	auth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from "@/firebase.js";
export default{
  name:"login",
  data(){
    return{
      email:"",
      pass:""
    };
  },
  methods: {
    login() {
    
			signInWithEmailAndPassword(auth, this.email, this.pass)
				.then(() => {
					this.$router.push("/home");
				})
				.catch((error) => {
					alert(error.message);
				});
		},
    }
  }

</script>

