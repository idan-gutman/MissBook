import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/global.scss'
import elementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(elementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
