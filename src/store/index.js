import Vue from 'vue';
import Vuex from 'vuex';
import {bookStore} from '@/store/modules/book.module.js';


Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  modules: {
    bookStore
  }
})
