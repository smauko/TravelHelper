<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="center">
          <div
            class="card bg-white text-black"
            style="border-radius: 1rem; width: 40rem"
          >
            <div class="card-body p-4 p-md-5 text-center">
              <div style="margin-bottom: -3%" class="mt-md-1 pb-5">
                <h2 class="fw-bold mx-auto">Prijava</h2>
                <p class="text-black-50 mb-5">Upišite svoj e-mail i lozinku!</p>

                <div class="form-outline form-black mb-4">
                  <input
                    type="email"
                    id="typeEmailX"
                    v-model="email"
                    class="form-control form-control-lg"
                    required
                  />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-black mb-4">
                  <input
                    type="password"
                    id="typePasswordX"
                    v-model="pass"
                    class="form-control form-control-lg"
                    required
                  />
                  <label class="form-label" for="typePasswordX">Lozinka</label>
                </div>
                <p class="small mb-5 pb-lg-2">
                  <a
                    class="text-black-50"
                    href="#"
                    @click.prevent="sendPassReset()"
                    >Zaboravio si šifru?</a
                  >
                </p>
                <div class="mt-4 pt-2">
                  <button class="btn btn-primary btn-lg" @click="login">
                    Submit
                  </button>

                  <p class="mb-0">
                    Nemaš račun?
                    <a href="/signup" class="text-blue-50 fw-bold"
                      >Registriraj se</a
                    >
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

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.gradient-custom {
  /* fallback for old browsers */
  background: #dfbda5;
}
</style>

<script>
import {
  auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
} from "@/firebase.js";

export default {
  name: "login",
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.pass)
        .then(() => {
          alert("Uspješna prijava!   :)");
          this.$router.replace("/home"); // u pushu mzes ici nazad sta nema smisla ako si ulogiran
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    sendPassReset() {
      if (this.email == "") {
        alert("Upiši email adresu prvo!");
      } else {
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            this.$router.replace("/pass-reset-msg");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }
    },
  },
};
</script>

