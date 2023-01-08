import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import reset from './assets/css/reset.css'
import  './assets/css/iconfont/iconfont.css'
import  './assets/css/iconfont/iconfont.js'
import global_msg from './store/global/global.js'
import '/src/assets/css/tailwindCss.css';
import ElementUI from 'element-ui';
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$global_msg = global_msg;
Vue.prototype.$message = Message;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use( VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
