<template>
  <section class="app">
    <user-msg />
    <app-header />
    <router-view />
    <app-footer />
  </section>
</template>
<script>
import bookApp from "@/views/book-app";
import appHeader from "@/cmps/app-header";
import appFooter from "@/cmps/app-footer";
import userMsg from "./cmps/user-msg";
export default {
  components: {
    bookApp,
    appHeader,
    appFooter,
    userMsg,
  },
};
</script>