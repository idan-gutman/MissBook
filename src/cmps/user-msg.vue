<template>
  <div v-if="msg" class="user-msg" :class="msg.class">
    <p>{{ msg.txt }}</p>
  </div>
</template>

<script>

import { eventBus } from "../services/event-bus-service";
export default {
  data() {
    return {
      msg: null,
    };
  },
  created() {
    eventBus.$on("show-msg", this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  destroyed() {
    eventBus.$off("show-msg", this.showMsg);
  },
};
</script>
