<template>
  <v-app>
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-card>
          <v-card-text>
            <div class="text-center">
              <p>
                Poslan je e-mail za promjenu lozinke, promijenite lozinku i
                pokušajte se ponovno prijaviti u TravelHelper.
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mx-auto" color="primary" @click="Return()"
              >Idi nazad</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
  methods: {
    Return() {
      this.$router.replace("/login");
    },
  },
};
</script>
