import Vue from 'vue';
import App from './App.vue';
import router from './router';  
import vuetify from './plugins/vuetify';
import Croppa from 'vue-croppa';  
import 'vue-croppa/dist/vue-croppa.css';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';


Vue.config.productionTip = false;
Vue.use(Croppa);

new Vue({
  router,
  vuetify,
  Croppa,
  render: h => h(App)
}).$mount('#app')

//okej